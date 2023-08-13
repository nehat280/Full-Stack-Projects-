import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col,Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap';
import {updateUserProfileActions} from '../store/reducers/userUpdateProfileReducer';
import {getUserDetails, updateUserProfile} from '../store/actions/user-actions';
import Loader from '../components/Loader';
import Message from '../components/Message'; 
import {ListMyOrders} from '../store/actions/order-actions';


const ProfileScreen =()=>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('') 
    const Navigate = useNavigate();  
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userProfile)
    const{error, loading,userProfile} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const updateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = updateProfile
    const listMyOrder = useSelector(state => state.listMyOrder)
    const {loading:loadingOrders, error: errorOrders,orders} = listMyOrder
    
    useEffect(()=>{
        if(!userInfo){
            Navigate('/login')
        }else{
            if(!userProfile || !userProfile.name || success || userInfo._id!==userProfile._id){
                dispatch(updateUserProfileActions.USER_UPDATE_PROFILE_RESET())
                dispatch(getUserDetails('profile'));
                dispatch(ListMyOrders());
                
            }else{
                setName(userProfile.name);
                setEmail(userProfile.email);
            }
        }

    },[dispatch, userInfo, Navigate,success,userProfile])

    const submitHandler =(e) =>{
        e.preventDefault();
        if (password !== confirmPassword){
            setMessage('Passwords doesnt match');
        }
        else{
            dispatch(updateUserProfile({'id':userInfo._id, 'name':name,
                                        'email':email, 'password':password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2> User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant = "danger">{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId = "name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type = "name"
                            placeholder = "Enter Name"
                            value = {name}
                            onChange = {(e)=> setName(e.target.value)}
                            >
                            </Form.Control>
                </Form.Group>
                <Form.Group controlId = "email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                        type = "email"
                        placeholder = "Enter Email"
                        value = {email}
                        onChange = {(e)=> setEmail(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId = "pasword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type = "pasword"
                        placeholder = "Enter password"
                        value = {password}
                        onChange = {(e)=> setPassword   (e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId = "paswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type = "pasword"
                        placeholder = "Confirm Password"
                        value = {confirmPassword}
                        onChange = {(e)=> setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? 
                        (<Loader/>):
                            errorOrders ?(<Message variant="danger">{errorOrders}</Message>)
                            :
                                (
                                    <Table  striped responsive className="table-sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order =>(
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0,10)}</td>
                                                    <td>${order.totalPrice}</td>
                                                    <td>{order.isPaid? order.paidAt.substring(0,10): (
                                                        <i className="fas fa-times" style={{color:'red'}}></i>
                                                    )}</td>
                                                    <td>
                                                        <LinkContainer to={`/order/${order._id}`}>
                                                            <Button className="btn-sm">Details</Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen;