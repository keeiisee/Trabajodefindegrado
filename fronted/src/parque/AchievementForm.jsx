import React from 'react';

export const AchievementForm = ({ show, onClose }) => {
  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el logro seleccionado
    console.log('Logro seleccionado');
    onClose();
  };
//si
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="achievement" className="block text-sm font-medium text-gray-700">
          Logro
        </label>
        <select
          id="achievement"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        >
          {/* Aquí puedes agregar las opciones para los logros */}
          <option value="logro1">Logro 1</option>
          <option value="logro2">Logro 2</option>
          <option value="logro3">Logro 3</option>
        </select>
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

