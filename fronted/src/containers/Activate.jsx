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
            navigate('/');
        }
    }, [verified, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 border border-primary shadow-lg rounded-md animate-pulse">
          <h2 className="text-2xl mb-4 text-primary text-center">
            Confirmar validacion
          </h2>
          <div className="flex justify-center items-center">
            <button
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-110 active:scale-95"
              onClick={verify_account}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

        // <div className='container'>
        //     <div
        //         className='d-flex flex-column justify-content-center align-items-center'
        //         style={{ marginTop: '200px' }}
        //     >
        //         <h1>Verify your Account:</h1>
        //         <button
        //             onClick={verify_account}
        //             style={{ marginTop: '50px' }}
        //             type='button'
        //             className='btn btn-primary'
        //         >
        //             Verify
        //         </button>
        //     </div>
        // </div>
    );
};

export default connect(null, { verify })(Activate);