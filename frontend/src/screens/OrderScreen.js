import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails, deliverOrder, payOrder } from '../actions/orderActions'

import {ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

import Loader from '../components/Loader'


function OrderScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderPaid = useSelector(state => state.orderPay)
    const { loading: loadingPaid, success: successPaid } = orderPaid


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    if (
        !loading && !error
    ) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    }



    if (!userInfo) {
        history.push('/login')
    }


    useEffect(() => {
        if (
            !order ||  successPaid || order._id !== Number(orderId) || successDeliver 
        ) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        
        }


    }, [dispatch, orderId, order,successPaid, successDeliver ])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const payHandler = () => {
        dispatch(payOrder(order))
    }

    return loading ?
        (<Loader />) :
        error ?
            (<Message>{error}</Message>) :

            (
                <div>
                    <h1>Order:{order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name:</strong>{order.user.name}</p>
                                    <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>


                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.shippingAddress.address},  {order.shippingAddress.city}
                                        {'  '}
                                        {order.shippingAddress.postalCode},
                                        {'  '}
                                        {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered ? (
                                        <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                                    ) : (
                                        <Message variant='warning'>Not Delivered</Message>
                                    )}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>

                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                                    ) :( <>



                                        <Message variant='warning'>Not Paid</Message>
                                        <Link to  = '/how-to-pay'>how to pay</Link>


                                    </>

                                    )}


                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? <Message variant='info'>
                                        Your order is empty
                                    </Message> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.qty} X {item.price}/-PKR = {(item.qty * item.price).toFixed(2)}/-PKR
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>{order.itemsPrice}/-PKR</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>{order.shippingPrice}/-PKR</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>{order.taxPrice}/-PKR</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>{order.totalPrice}/-PKR</Col>
                                        </Row>
                                    </ListGroup.Item>




                                </ListGroup>
                                {loadingPaid && <Loader />}
                                {userInfo && userInfo.isAdmin && !order.isPaid && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={payHandler}
                                        >
                                            Mark As Paid
                                        </Button>
                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderScreen