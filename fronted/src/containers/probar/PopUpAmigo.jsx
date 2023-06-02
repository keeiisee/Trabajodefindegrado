import React from 'react'

const PopUpAmigo = ({ children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-auto max-w-2xl">

            {children}
          </div>
        </div>
      );
    };

export default PopUpAmigo