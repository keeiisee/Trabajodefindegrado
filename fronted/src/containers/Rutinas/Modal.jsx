import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ children, isOpen, onClose }) => {
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Crear Rutina
            </Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '10px',
                    }}
                >
                    <CSSTransition in={isOpen} timeout={200} classNames="modal" unmountOnExit>
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute top-0 right-0 m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {children}
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={isOpen} timeout={200} classNames="backdrop" unmountOnExit>
                        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}></div>
                    </CSSTransition>
                </div>
            </Modal>
        </>
    );
}

export default Modal;