import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { useParams } from "react-router-dom"

const Activate = ({ verify }) => {
    const [verified, setVerified] = useState(false);
    const routeParams = useParams()
    const navigate = useNavigate()
    
    const verify_account = e => {
        const uid = routeParams.uid;
        const token = routeParams.token;

        verify(uid, token);
        setVerified(true);
    };

    useEffect(() => {
        if (verified) {
            navigate('/login');
        }
    }, [verified, navigate]);

    return (
        <div className='container'>
            <div
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);