import React, {useEffect,useState} from 'react'
import {PayPalButtons } from '@paypal/react-paypal-js';
import {Row, Col, ListGroup, Image,Button, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {Link,useParams,useNavigate} from 'react-router-dom'

import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderDetails, payOrder,deliverOrder} from '../store/actions/order-actions';
import {orderPayActions,orderDeliverActions} from '../store/reducers/orderReducer';

function OrderScreen() {
    const dispatch = useDispatch()
    const params = useParams();
    const orderId = params.id;
    const Navigate = useNavigate();
    const orderDetails = useSelector(state=> state.orderDetail)
    const {order, error, loading} = orderDetails;

    const orderPay = useSelector(state=> state.orderPay)
    const {success:successPay, loading:loadingPay} = orderPay;

    const orderDeliver = useSelector(state=> state.orderDeliver)
    const {success:successDeliver, loading:loadingDeliver} = orderDeliver;

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const [itemsPrice, setitemsPrice] = useState(0);
    const [shippingPrice, setshippingPrice] = useState(0);
    const [taxPrice, settaxPrice] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);
       
    useEffect(()=>{ 
        if(!loading && !error && order){
            setitemsPrice(order.orderItems.reduce((acc, item) => acc + item.price * item.qty,0).toFixed(2));
            setshippingPrice((itemsPrice >100? 0: 10).toFixed(2));
            settaxPrice(Number((0.082)*itemsPrice).toFixed(2))
            settotalPrice((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2))
            }
    },[loading,error,order,itemsPrice,shippingPrice,taxPrice,totalPrice])

    const createOrder =(data,actions)=>{
            return actions.order.create(
            {                                            
                purchase_units: [
                    {
                        amount: {
                            value: totalPrice,
                        },
                    },
                ],
            })
        }
    const onApprove =(data, actions) =>{
        return actions.order.capture().then(function (details) {
            successPaymentHandler(details);
               });
           }



    useEffect(()=>{
            if(!userInfo){
                Navigate('/login')
            }
            if(!order || successPay || order._id !== Number(orderId) || successDeliver){
                dispatch(orderPayActions.ORDER_PAY_RESET())
                dispatch(orderDeliverActions.ORDER_DELIVER_RESET())
                dispatch(getOrderDetails(orderId))
        }
                
    },[order,orderId,dispatch,Navigate,userInfo,successPay,successDeliver])

    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler = ()=>{
        dispatch(deliverOrder(order))
    }


  return (
    loading? (<Loader/>):
                error?(<Message variant="danger">{error}</Message>):
    (order?(                    
            <div>
                <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p><strong>Name:</strong>{order.user.name} </p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p><strong>Name:</strong>{order.user.name} </p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country} 
                            </p>
                            {order.isDelivered? 
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>:
                                (<Message variant="warning">Not Delivered</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong> Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid? 
                                <Message variant="success">Paid on {order.paidAt}</Message>:
                                (<Message variant="warning">Not Paid</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {order.orderItems.length === 0?
                                <Message variant="info">Orders is empty</Message>
                                :
                                    (<ListGroup variant="flush">
                                        {order.orderItems.map((item, index)=>
                                        <ListGroup.Item key={index} >
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty* item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)}
                                    </ListGroup>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2> Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                        <PayPalButtons 
                                            createOrder= {createOrder}
                                            onApprove={onApprove}
                                        />
                                    
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                     {userInfo  && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                        <ListGroup.Item>
                            <Button 
                                type="button"
                                className="btn btn-block"
                                onClick = {deliverHandler}>
                                Mark as Delivered
                            </Button>
                        </ListGroup.Item>
                     )}
                        
                    </Card>
                </Col>
            </Row>
            </div>):<p>No orders</p>
  ))
}

export default OrderScreen;
