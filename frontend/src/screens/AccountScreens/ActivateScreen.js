import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import FormContainer from '../../components/FormContainer'
import { activate } from '../../actions/userActions';

function ActivateScreen({ match, history }) {


    const dispatch = useDispatch()

    const [verified, setVerified] = useState(false);

    const activate_account = e => {
        const uid = match.params.id;
        const token = match.params.token;

        dispatch(activate(uid, token))
        setVerified(true);
    };


    useEffect(() => {
        if (verified) {
            history.push('/login')
            
        }
    }, [history, verified])
    return (
        <FormContainer >
            <div
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <Button
                    onClick={activate_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </Button>
            </div>
        </FormContainer>
    )
}

export default ActivateScreen
