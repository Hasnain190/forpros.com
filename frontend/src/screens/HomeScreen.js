import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import queryString from 'query-string';
import { googleAuthenticate } from '../actions/userActions'
import { useLocation } from 'react-router-dom'


import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousal from '../components/ProductCarousal'
import { USER_REGISTER_SUCCESS, USER_ACTIVATE_SUCCESS } from '../constants/userConstants'
function HomeScreen({ history }) {


    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList


    // const userActivate = useSelector(state => state.userActivate)
    // const { success } = userActivate
    const userRegister = useSelector(state => state.userRegister)
    const { success:successRegister } = userRegister

    let keyword = history.location.search
    let state = history.location.search
    let code = history.location.search


    // console.log(keyword)
    // console.log('State: ' + state);
    // console.log('Code: ' + code);


    const [message, setMessage] = useState('')


  
    useEffect(() => {
       
        
        dispatch(listProducts(keyword))

        if(successRegister){
            setMessage('Please check your email to activate your account. We have sent a link there')

        }
        // setMessage('')
        // console.log(products.length)
        console.log(message)
        if (state && code) {
            dispatch(googleAuthenticate(state, code));
          }
    }, [code, dispatch, keyword, message, state, successRegister]
    )
const searchTerm = keyword.split('=')[1]
const searchResults =  Number(products.length)

    return (
        <div>
            {message && (<Message variant='success'>{message}</Message>)}
            {!keyword && <ProductCarousal />}
            {(!keyword && (<h1>Latest Products (updated)</h1>)) || (
            <>

            <h2>Search Result for</h2><p>"{searchTerm}"</p>
            <p>{searchResults} products were found</p>
            </>
             )}
            
            {loading ? (<Loader />)
                : error ? (<Message variant='danger'>{error}</Message>)
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )
                        )}
                    </Row>
            }
     
            

        </div>
    )
}

export default HomeScreen
