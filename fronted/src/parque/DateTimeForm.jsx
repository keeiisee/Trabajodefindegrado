import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crear_reserva } from '../actions/reserva';
import { Listbox } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';

export const DateTimeForm = ({ show, onClose, park, enBD, onReservaCreated }) => {
  if (!show) return null;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  //Nuevo select
  const materials = [
    'comba',
    'cuerda',
    'magnesio',
    'altavoz',
    'paralelas',
    'guantes',
    'coderas',
  ];
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const availableMaterials = materials.filter((material) => !selectedMaterials.includes(material));
  const handleMaterialSelection = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((item) => item !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };
  const handleCancel = () => {
    // Aquí puedes agregar el código para borrar los datos del formulario si es necesario.
    // Por ejemplo, si estás usando useState para manejar los datos del formulario, puedes llamar a las funciones para establecer el estado inicial.
    onClose();
  };
  //fin nuevo
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(crear_reserva(park, date, time, selectedMaterials, enBD))
    if (onReservaCreated) {
      onReservaCreated();
    }
    onClose();
  };
  //si
  return (
    
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Hora
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700">
          Material
        </label>
        <Listbox value={selectedMaterials} onChange={handleMaterialSelection} className="mt-1">
          <div className="relative">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selectedMaterials.length === 0
                  ? 'Selecciona un material'
                  : selectedMaterials.join(', ')}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-sm max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {availableMaterials.map((material, index) => (
                <Listbox.Option key={index} value={material} className={({ active }) => `${active ? 'text-white bg-indigo-600' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`}>
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {material}
                      </span>
                      {selected ? (
                        <span className={`${active ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedMaterials.map((material, index) => (
            <div key={index} className="flex items-center py-1 px-2 bg-indigo-200 rounded-full text-sm">
              <span className="mr-1">{material}</span>
              <button
                type="button"
                onClick={() => handleMaterialSelection(material)}
                className="w-4 h-4 flex items-center justify-center text-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <XIcon className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex justify-center ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Aceptar
        </button>
      </div>
    </form>
  );
};

