import React, { useState, useEffect } from 'react'


import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { categoryListProducts } from '../actions/categoryActions'



import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'


function CategoricallyProductsScreen({ match }) {
    const categoryId = match.params.id

    const dispatch = useDispatch()
    const productCategoryList = useSelector(state => state.productCategoryList)
    const { error, loading, products } = productCategoryList



    const productCategory = useSelector(state => state.productCategory)
    const { error: errorCategory, loading: loadingCategory, products: productsCategory } = productCategory
    const x = productsCategory.find(e => {
        return e.id === Number(categoryId)
    })

    let y = x.product_category

    useEffect(() => {

        // dispatch(categoryProducts())
        dispatch(categoryListProducts(categoryId))
        console.log(productsCategory)
        console.log(categoryId)
        console.log(x.product_category)

    }, [dispatch, productsCategory, categoryId, x]
    )

    return (
        <div>
            <>
                {loadingCategory ? (<Loader />)
                    : errorCategory ? (<Message variant='danger'>{error}</Message>)
                        :

                        (<h1>
                            {y}
                        </h1>)

                }

            </>




            {loading ? (<Loader />)
                : error ? (<Message variant='danger'>{error}</Message>)
                    : <Row>

                        {products?.map(product => (

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

export default CategoricallyProductsScreen
