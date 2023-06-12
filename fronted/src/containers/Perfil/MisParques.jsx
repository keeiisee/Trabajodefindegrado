import React from 'react'
import ParqueCard from './ParqueCard';

const MisParques = ({ reservas = [] }) => {
    return (
        <>
            {reservas.length <= 0 && (
                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay nada que ver</h1>
                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                </div>
            )}
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservas.map((park) => (
                    <ParqueCard key={park.id} park={park} />
                ))}
            </div>
        </>
    )
}

export default MisParques
