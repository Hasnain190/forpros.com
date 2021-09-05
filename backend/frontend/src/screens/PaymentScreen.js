import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('')

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
        // console.log(paymentMethod)
        // window.onclick = e => {
        //     console.dir(e.target);  // use this in chrome
        //     // console.log(e.target);  // use this in firefox - click on tag name to view 
        // }  
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        {/* <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check> */}
                        <Form.Check
                            type='radio'
                            label='Easypaisa'
                            id='Easypaisa'
                            name='paymentMethod'
                         
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Jazzcash'
                            id='Jazzcash'
                            name='paymentMethod'

                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
