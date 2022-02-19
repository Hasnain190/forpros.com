import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword = history.location.search
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])
    const searchTerm = keyword.split('=')[1]
    const searchResults = Number(products.length)

    return (
        <div>
            {message && (<Message variant='success'>{message}</Message>)}
            {!keyword && <ProductCarousel />}
            {(!keyword && (<h1>Latest Products</h1>)) || (
                <>

                    <h2>Search Result for</h2><p>"{searchTerm}"</p>
                    <p>{searchResults} products were found</p>
                </>
            )}

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
