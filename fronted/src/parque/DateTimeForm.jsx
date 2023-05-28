import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crear_reserva } from '../actions/reserva';

export const DateTimeForm = ({ show, onClose, place_id }) => {
  if (!show) return null;
  const user = useSelector(state => state.auth.user);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(crear_reserva(place_id, date, time ))
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
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Aceptar
      </button>
    </form>
  );
};

