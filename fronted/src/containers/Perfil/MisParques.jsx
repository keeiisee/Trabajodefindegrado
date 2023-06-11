import React, { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const MisParques = ({ reservas = [] }) => {
    return (
        <>
            {reservas.length <= 0 && (
                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay reservas que ver</h1>
                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                </div>
            )}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <TransitionGroup component={null}>
                        {reservas.map((reserva) => (
                            <CSSTransition key={reserva.id} timeout={500} classNames="item">
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src={reserva.parque.imagenUrl ? reserva.parque.imagenUrl : 'https://deportesurbanos.com/wp-content/uploads/2020/03/Instalacion-Parque-Calistenia-DUCNT-122.jpg'}
                                        alt={reserva.parque.name}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold">{reserva.parque.name}</h3>
                                        <p className="text-sm text-gray-600">{reserva.parque.description}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Fecha de registro: {reserva.fecha}
                                        </p>
                                    </div>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        </>
    )
}

export default MisParques
