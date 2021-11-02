import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userActions'
import axios from 'axios'


function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
// 
    useEffect(() => {
        if (userInfo ) {
            history.push(redirect)
        }
        // console.log(redirect)
        //  console.log(location)
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:8000/google`)

            window.location.replace(res.data.authorization_url);
            console.log(res.data.authorization_ur)
        } catch (err) {
            console.log(err)

        }
    };
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
            <Row className='py-3'>
            <Col>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            
            </Col>
            </Row>
            <Row className='py-3'>
                <Col>
                <button className="btn btn-outline-danger rounded-pill" onClick = {continueWithGoogle}>
                <i class="fab fa-google p-1"></i>
                    Continue with GOOGLE
                </button>
                  
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
