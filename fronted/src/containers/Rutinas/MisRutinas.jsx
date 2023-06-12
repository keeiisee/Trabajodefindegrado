import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
const groupRutinasByLevel = (rutinas) => {
    const groupedRutinas = {};

    rutinas.forEach((rutina) => {
        const level = `nivel ${rutina.nivel}`;
        if (!groupedRutinas[level]) {
            groupedRutinas[level] = [];
        }
        groupedRutinas[level].push(rutina);
    });

    return groupedRutinas;
};
const MisRutinas = ({ rutinas }) => {
    const [selectedRutina, setSelectedRutina] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const levels = ['nivel 1', 'nivel 2', 'nivel 3'];

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const closeModal = () => {
        setSelectedRutina(null);
    };

    const groupedRutinas = groupRutinasByLevel(rutinas);
    return (
        <div className="container px-5 mx-auto mb-8 mt-8">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {levels.map((level, index) => (
                    <Tab
                        key={level}
                        label={level.charAt(0).toUpperCase() + level.slice(1)}
                    />
                ))}
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {levels.map((level, index) =>
                    activeTab === index
                        ? groupedRutinas[level]?.map((rutina, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white shadow-md rounded-lg cursor-pointer"
                                onClick={() => setSelectedRutina(rutina)}
                            >
                                <h2 className="text-xl font-bold">{rutina.nombre}</h2>
                                <p className="mt-2">
                                    Repeticiones por set: {rutina.repeticiones_set}
                                </p>
                            </div>
                        ))
                        : null
                )}
            </div>
            <div className="container px-5 mx-auto mb-8 mt-8"></div>
            {selectedRutina && (
                <Transition appear show={!!selectedRutina} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                            </Transition.Child>
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {selectedRutina.nombre}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <p>
                                            Repeticiones por set: {selectedRutina.repeticiones_set}
                                        </p>
                                        <div className="mt-4">
                                            <h4 className="font-semibold">Sets:</h4>
                                            <ul className="list-disc list-inside mt-2">
                                                {selectedRutina.sets.map((set) => (
                                                    <li key={set.id}>
                                                        {set.repeticiones} repeticiones de {set.ejercicio}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt4">
                                        {/* Agrega aquí más información sobre la rutina */}
                                    </div>
                                    <div className="mt-6 grid gap-2 grid-cols-1 md:grid-cols-3">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                        >
                                            Abandonar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => {
                                                addRutina(selectedRutina.id);
                                            }}
                                        >
                                            Completada
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </div>
    );
};

export default MisRutinas