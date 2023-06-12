import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';

import Modal from 'react-modal';
const niveles = [
    { id: 1, name: 'Principiante' },
    { id: 2, name: 'Intermedio' },
    { id: 3, name: 'Avanzado' },
];


const CrearRutina = () => {
    const [nivel, setNivel] = useState(niveles[0]);
    const [repeticionesSet, setRepeticionesSet] = useState(1);
    const [sets, setSets] = useState([{ repeticiones: 1, ejercicio: '' }]);

    const handleNivelChange = (nivel) => {
        setNivel(nivel);
    };

    const handleRepeticionesSetChange = (event) => {
        setRepeticionesSet(parseInt(event.target.value));
    };

    const handleSetChange = (index, field, value) => {
        const newSets = [...sets];
        newSets[index][field] = value;
        setSets(newSets);
    };
    const [modalOpen, setModalOpen] = useState(false);
    const handleAddSet = () => {
        setSets([...sets, { repeticiones: 1, ejercicio: '' }]);
    };

    const handleRemoveSet = (index) => {
        const newSets = [...sets];
        newSets.splice(index, 1);
        setSets(newSets);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const setsString = sets.map((set) => `${set.repeticiones} x ${set.ejercicio}`).join(', ');
        console.log(`Nivel: ${nivel.name}, Repeticiones del set: ${repeticionesSet}, Sets: ${setsString}`);
        // Aquí puedes enviar los datos al servidor
    };

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Abrir formulario</button>
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto outline-none bg-gray-600 bg-opacity-75"
                overlayClassName="fixed inset-0 z-50 overflow-y-auto"
            >
                <div className="relative max-w-screen-md mx-auto my-auto bg-white p-4 sm:p-6 rounded-lg overflow-y-auto">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="absolute top-2 right-2 p-1 bg-gray-300 rounded-full focus:outline-none"
                    >
                        <span className="sr-only">Cerrar formulario</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path
                                fillRule="evenodd"
                                d="M12.707 7.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M7.293 7.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Nivel de dificultad:</label>
                            <Listbox value={nivel} onChange={handleNivelChange} className="w-full">
                                {({ open }) => (
                                    <>
                                        <div className="relative">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                                <span className="block truncate">{nivel.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </Listbox.Button>
                                            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" className="absolute w-full mt-1 bg-white shadow-lg">
                                                <Listbox.Options static className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {niveles.map((nivel) => (
                                                        <Listbox.Option key={nivel.id} value={nivel} className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9')}>
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{nivel.name}</span>
                                                                    {selected && (
                                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" />
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1000 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="repeticionesSet" className="block text-sm font-medium text-gray-700">
                                Número de repeticiones del set:
                            </label>
                            <input
                                type="number"
                                id="repeticionesSet"
                                value={repeticionesSet}
                                onChange={handleRepeticionesSetChange}
                                min="1"
                                className="block w-full py-2 pl-3 pr-12 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {sets.map((set, index) => (
                            <div key={index} className="space-y-1">
                                <label htmlFor={`set${index}repeticiones`} className="block text-sm font-medium text-gray-700">
                                    Ejercicio {index + 1}:
                                </label>
                                <div className="flex flex-wrap items-center">
                                    Num Repeticiones
                                    <input
                                        type="number"
                                        id={`set${index}repeticiones`}
                                        placeholder=''
                                        value={set.repeticiones}
                                        onChange={(event) => handleSetChange(index, 'repeticiones', parseInt(event.target.value))}
                                        min="1"
                                        className="w-24 py-2 pl-3 pr-12 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <span className="mx-2">x</span>
                                    <input
                                        required
                                        placeholder='Ejercicio'
                                        type="text"
                                        value={set.ejercicio}
                                        onChange={(event) => handleSetChange(index, 'ejercicio', event.target.value)}
                                        className="flex-grow py-2 pl-3 pr-12 sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSet(index)}
                                        className="inline-flex items-center justify-center px-4 py-2 mt-2 ml-auto sm:ml-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={handleAddSet}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Añadir ejercicio
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};


export default CrearRutina;