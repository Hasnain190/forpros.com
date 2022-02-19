import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { categoryProducts, editCategory } from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function CategoryEditScreen({ match, history }) {

    const dispatch = useDispatch()
    const [newCategory, setNewCategory] = useState('')
    const categoryEdit = useSelector(state => state.categoryEdit)
    const { error: errorEdit, loading: loadingEdit, success: successEdit } = categoryEdit
    const [message, setMessage] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        console.log('something', match.params.id, newCategory)


        dispatch(editCategory({ product_category: newCategory }, match.params.id))

        // history.push('/admin/categorylist')
        // dispatch(categoryProducts())


    }
    useEffect(() => {

        if (successEdit) {
            setNewCategory('')

            dispatch(categoryProducts())
            setMessage(' Category updated successfully ✓')
        }

        // console.log('this page is working')

    }, [dispatch, successEdit])

    return (
        <>
            {message && <Message variant='success'>{message}</Message>}
            {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
            {loadingEdit && <Loader />}
            <Form onSubmit={submitHandler}>


                <Form.Group controlId='category'>

                    <Form.Control
                        type='text'
                        placeholder='Enter New Category'
                        name="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    >


                    </Form.Control>



                    <Button >
                        <i class="fas fa-check"></i>  Update
                    </Button>

                </Form.Group>
            </Form>


        </>


    )
}

export default CategoryEditScreen
