import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Table, Row, Col } from 'react-bootstrap'

import { categoryProducts, deleteCategory, createCategory, editCategory } from '../actions/categoryActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'


function CategoryScreen() {


    const dispatch = useDispatch()

    const productCategory = useSelector(state => state.productCategory)
    const { error, loading, products } = productCategory
    
    const categoryCreate = useSelector(state => state.categoryCreate)
    const { error: errorCreate, loading: loadingCreate, category, success: successCreate } = categoryCreate
   
   

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    useEffect(() => {

      
        dispatch(categoryProducts())



    }, [dispatch, successDelete, successCreate ])
    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this category? It will remove all related products from it')) {
            dispatch(deleteCategory(id))
        }
    }


    const createCategoryHandler = () => {
        dispatch(createCategory())
        console.log('some things')
    }



    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Categories</h1>
                </Col>


            </Row>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (

                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th >NAME</th>
                                   
                                 
                                    <th >edit button</th>
                                    <th >delete</th>



                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>

                                        <td  >
                                            {product.product_category}
                                        </td>
                                        
                                        <td>
                                            <LinkContainer to={`/admin/categorylist/${product.id}/edit`}>

                                             <Button variant='light'  className='btn-sm' >
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                            </LinkContainer>
                                           
                                        </td>
                                        <td>

                                            <Button variant='danger'  className='btn-sm' onClick={() => deleteHandler(product.id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))}
                                <Button className='my-3' onClick={createCategoryHandler}>
                                    <i className='fas fa-plus'></i> Create A New Category
                                </Button>

                            </tbody>
                        </Table>




                       
                    )





            }


        </div>
    )
}

export default CategoryScreen
