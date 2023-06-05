import React from 'react'
import Amigo from '../probar/Amigo';
import PopUpAmigo from './PopUpAmigo';
import { MdClose } from 'react-icons/md';
const ListaAmigos = ({ friends, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="mx-10 bg-white p-4 rounded shadow-md w-full md:w-auto max-w-2xl">
    <div className=" w-full md:w-72 relative">
      <h2 className="font-bold text-xl mb-4">Amigos</h2>
      <div className="space-y-4">
        {friends.length <= 0 &&
          <p className="font-bold text-decoration-line: underline">No tienes amigos</p>
        }
        {friends.map((friend, index) => (
          <Amigo key={index} name={friend[0].user_name} imageUrl={friend[0].imagen} id={friend[0].user_id}/>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <MdClose size={24} />
      </button>
    </div>
    </div>
    </div>
 
);
export default ListaAmigos