import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom'

import {getUserDetails,updateUser} from '../store/actions/user-actions';
import Loader from '../components/Loader';
import Message from '../components/Message'; 
import FormContainer from '../components/FormContainer';
import {userUpdateActions} from '../store/reducers/userProfileReducer';

const UserEditScreen =()=>{
    const userId = useParams().id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const Navigate = useNavigate();
    // const Navigate = useNavigate();  
    // const location = useLocation();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userProfile)
    const {error, loading, userProfile} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch(userUpdateActions.USER_UPDATE_RESET);
            Navigate('/admin/userlist');
        }else{
            if(!userProfile.name || userProfile._id !== Number(userId)){
                dispatch(getUserDetails(userId))    
            }else{
                setName(userProfile.name)
                setEmail(userProfile.email)
                setAdmin(userProfile.isAdmin)
            }
        }
        
    },[Navigate, successUpdate,dispatch,userProfile,userId])
    
    const submitHandler =(e) =>{
        e.preventDefault();
       dispatch(updateUser({_id:userProfile._id,name,email,isAdmin}));
    }

    return (
        <div>
            <Link to="/admin/userlist">
                Go Back
            </Link>
            <FormContainer>
             <h1>Edit User</h1>
             {loadingUpdate && <Loader/>}
             {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader/>: error? <Message variant="danger">{error}</Message>:(
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId = "name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control                           
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
                                type = "email"
                                placeholder = "Enter Email"
                                value = {email}
                                onChange = {(e)=> setEmail(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "isadmin">
                            {/* <Form.Label>is Admin</Form.Label> */}
                            <Form.Check
                                type = "checkbox"
                                label = "Is Admin"
                                checked = {isAdmin}
                                onChange = {(e)=> setAdmin(e.target.checked)}
                                />
                            
                        </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
    
                )}
                
        </FormContainer>
        </div>
        
    )
}

export default UserEditScreen;
