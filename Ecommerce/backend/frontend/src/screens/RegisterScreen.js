import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'

import {Register} from '../store/actions/user-actions';
import Loader from '../components/Loader';
import Message from '../components/Message'; 
import FormContainer from '../components/FormContainer';

const RegisterScreen =()=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('') 
    const Navigate = useNavigate();  
    const location = useLocation();
    const dispatch = useDispatch();

    const redirect = location.search? location.search.split("=")[1]: '/';
    const userRegister = useSelector(state => state.userRegistration)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            Navigate(redirect)
        }
    },[redirect, userInfo,Navigate])
    
    const submitHandler =(e) =>{
        e.preventDefault();
        if (password !== confirmPassword){
            setMessage('Passwords doesnt match');
        }
        else{
            dispatch(Register(name,email,password))
        }
    }

    return (
        <FormContainer>
             <h1>Sign in</h1>
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
                        required
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
                        required
                        type = "pasword"
                        placeholder = "Confirm Password"
                        value = {confirmPassword}
                        onChange = {(e)=> setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account ? <Link to={redirect? `/login?redirect=${redirect}`:`register`}
                    >
                        Sign-in
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
