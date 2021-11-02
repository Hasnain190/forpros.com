import React, { useState , useEffect} from 'react';
import { resetUserPassword } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button,  } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


const ResetPasswordScreen = ( ) => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: ''
    });
    const dispatch = useDispatch()


    const userPasswordReset = useSelector(state => state.userPasswordReset)
    const { error, loading , success } = userPasswordReset

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(resetUserPassword(email));
    };



    useEffect(() => {
        if (success) {
            
            setMessage('Please check your mail box')

        }
    }, [success])


    return (
        <FormContainer className='container mt-5'>
            <h1>Request Password Reset:</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {message && <Message variant='success'>{message}</Message>}
            <p>Enter your registered email and we will send you  a mail containing the link to reset password.</p>
            <Form onSubmit={onSubmit}>
                <Form.Group className='form-group'>
                    <Form.Control
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    >

                    </Form.Control>
                </Form.Group>
                <p></p>
                <Button className='btn btn-primary' type='submit'>Reset Password</Button>
            </Form>
        </FormContainer>
    );
};

export default ResetPasswordScreen
