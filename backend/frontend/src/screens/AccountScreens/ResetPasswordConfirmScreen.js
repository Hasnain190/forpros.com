import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { resetUserPasswordConfirm } from '../../actions/userActions';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'


function ResetPasswordConfirmScreen({ match, history }) {
    const [message, setMessage] = useState('');

    const id = match.params.id;
    const token = match.params.token;

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (new_password !== re_new_password){
            setMessage('Password does not match')
        }else{
            dispatch(resetUserPasswordConfirm(id, token, new_password, re_new_password));

        }



    };
    const userPasswordResetConfirm = useSelector(state => state.userPasswordResetConfirm)
    const { error, loading, success } = userPasswordResetConfirm

    useEffect(() => {
       
        if (success) {

            setMessage('Your password is changed successfully. Next time keep it remember.')

            history.push('/login')

        }
        setMessage('')

    }, [success, history , new_password , re_new_password])

    return (
        <FormContainer >
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group className='form-group'>
                    <Form.Control
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    >

                    </Form.Control>
                </Form.Group>
                <p></p>
                <Form.Group className='form-group'>
                    <Form.Control
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </Form.Group>
                <br></br>
                <Button className='btn btn-primary' type='submit'>Reset Password</Button>
            </Form>
        </FormContainer>
    )
}

export default ResetPasswordConfirmScreen
