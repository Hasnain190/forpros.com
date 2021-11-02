import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToWishlist , removeFromWishlist } from '../actions/wishlistActions'

function WishlistScreen({ history , match }) {
    const productId = match.params.id
   
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const { wishlistItems } = wishlist
    useEffect(
        () => {
            if (productId) {
             
                dispatch(addToWishlist(productId))
            }
            console.log('id',productId)
        }, [dispatch, productId]
    )
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id))
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Your Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <Message variant='info'>
                        Your Wishlist is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {wishlistItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                             <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            {item.price}/-PKR
                                        </Col>

                                        {/* <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToWishlist(item.product, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col> */}

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromWishlistHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            {/* <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({wishlistItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${wishlistItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                    <Button
                                                    onClick={addToCartHandler}

                                                    className='btn-block'
                                                    disabled={product.countInStock === 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                    </ListGroup.Item>


                </Card>
            </Col> */}
        </Row>
    )
}

export default WishlistScreen
