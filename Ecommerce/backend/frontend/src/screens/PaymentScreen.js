import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import {savePaymentMethod} from '../store/actions/cart-actions'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(){
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
  
    const Navigate = useNavigate();  
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    if(!shippingAddress.address){
        console.log("inside")
        Navigate('/shipping')
    }
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        Navigate('/placeorder')
    }

    return(
       
        <FormContainer>
             
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>
                        <Col>
                            <Form.Check type="radio" 
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentmethod"
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}>

                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continue
                    </Button>
                </Form>
            
        </FormContainer>
     );
}

export default PaymentScreen;