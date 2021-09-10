import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen({ match, history }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productMedia = useSelector(state => state.productDetails.product.media)
  
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const addToWishlistHandler = () => {
        history.push(`/wishlist/${match.params.id}`)
    }

    useEffect(() => {
        if (successProductReview) {
            setComment('')
            setRating(0)
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))


    }, [dispatch, match, successProductReview]
    )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }
        ))
    }
   
   
    const mediaChangeHandler = (src) => {
        imageRef.current.src = src
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>

            {loading ? <Loader />
                : error ? <Message variant="danger">{error}</Message>
                    : (
                        <div>
                            <Row  >

                                <Col md={6}>
                                    <Image src={product.image} alt={product.name}  ref={imageRef} fluid />
                                    <Row md={3} className="container-fluid">
                                        {productMedia &&
                                            <ListGroup variant="flush">
                                                {
                                                    productMedia[0]?.image3 && <ListGroup.Item >

                                                        <Image src={productMedia[0].image3} alt={productMedia[0].image3}  onClick={(e)=>{mediaChangeHandler(e.target.src)}}  fluid />

                                                    </ListGroup.Item>
                                                }

                                                {
                                                    productMedia[0]?.image4 && <ListGroup.Item >

                                                        <Image src={productMedia[0].image4} alt={productMedia[0].image5}  onClick={(e)=>{mediaChangeHandler(e.target.src)}}  fluid />

                                                    </ListGroup.Item>
                                                }
                                                {
                                                    productMedia[0]?.image5 && <ListGroup.Item >

                                                        <Image src={productMedia[0].image5} alt={productMedia[0].image5}  onClick={(e)=>{mediaChangeHandler(e.target.src)}}  fluid />

                                                    </ListGroup.Item>
                                                }
                                                {
                                                    productMedia[0]?.video && <ListGroup.Item >

                                                        <video width="300" controls   >
                                                            <source src={productMedia[0].video} type="video/mp4" />
                                                        </video>
                                                    </ListGroup.Item>
                                                }

                                            </ListGroup>
                                        }
                                    </Row>

                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: {product.price}/-PKR
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>{product.price} /-PKR</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <>
                                                    <Button
                                                        onClick={addToCartHandler}

                                                        className='btn-block'
                                                        disabled={product.countInStock === 0}
                                                        type='button'>
                                                        Add to Cart
                                                    </Button>
                                                    <p></p>
                                                    <Button
                                                        onClick={addToWishlistHandler}

                                                        className='btn-block'
                                                        disabled={product.countInStock === 0}
                                                        type='button'>
                                                        Add to Wishlist
                                                    </Button>

                                                </>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>


                            </Row>
                            <Row >
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>



                                </Col>

                            </Row>
                        </div>




                    )




            }
        </div>
    )
}

export default ProductScreen
