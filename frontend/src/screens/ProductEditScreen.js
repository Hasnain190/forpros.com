import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { categoryProducts, includeCategory } from '../actions/categoryActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

function ProductEditScreen({ match, history }) {

    const productId = match.params.id


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [bannerImage, setBannerImage] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')

    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [Featured, setFeatured] = useState(false)
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const productCategory = useSelector(state => state.productCategory)
    const { error: errorCategory, loading: loadingCategory, products: productsCategory } = productCategory

    const categoryInclude = useSelector(state => state.categoryInclude)
    const { error: errorInclude, loading: loadingInclude, success: successInclude } = categoryInclude


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
                dispatch(categoryProducts())
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBannerImage(product?.media?.bannerImage)
                setImage3(product?.media?.image3)
                setImage4(product?.media?.image4)
                setImage5(product?.media?.image5)
                setBrand(product.brand)
                setFeatured(product.Featured)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }



    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image, bannerImage, image3, image4, image5,
            Featured,
            brand,
            category,
            countInStock,
            description
        }))

    }

    const includeCategoryHandler = async (categoryId, productId) => {
        dispatch(includeCategory(categoryId, productId))
        setCategory(product.category)

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
    return (
        <div>
            <Link to='/admin/productlist/'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Main Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label=''
                                    // custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image - 2 </Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image3}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label=''
                                    // custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image - 3</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image4}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label=''
                                    // custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>
                            <br />
                            <Form.Group controlId='Featured'>
                                <Form.Check
                                    type='checkbox'
                                    label='Add to Featured'
                                    checked={Featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <br />
                            {Featured &&

                                <Form.Group controlId='image'>
                                    <Form.Label>Banner Image</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter banner Image'
                                        value={bannerImage}
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </Form.Control>
                                    <Form.File
                                        id='image-file'
                                        label=''
                                        // custom
                                        onChange={uploadFileHandler}
                                    >

                                    </Form.File>
                                    {uploading && <Loader />}

                                </Form.Group>
                            }

                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>





                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>


                                <Form.Control
                                    as='select'
                                    type='text'
                                    placeholder='Enter category'
                                    value={product.category}
                                    onChange={(e) => includeCategoryHandler(e.target.value, productId)}
                                >
                                    {productsCategory?.map(product => {
                                        return (
                                            <option key={product.id} value={product.id}> {product.product_category}


                                            </option>

                                        );
                                    })}

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen