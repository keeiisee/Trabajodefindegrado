import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFriend } from '../../actions/auth';

const FriendList = ({ friends }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function perfil(e, id) {
    e.preventDefault()
    dispatch(removeFriend(id))
    window.location.reload()
  }
  return (
    <>
      {friends.length <= 0 && (
        <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
          <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No tienes amigos</h1>
          <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
        </div>
      )}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">

        {friends.map((friend) => (
          <div key={friend[0].user_id} className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              className="w-full h-64 object-cover mb-4 rounded-lg"
              src={friend[0].imagen}
              alt={`${friend[0].user}'s avatar`}
            />
            <a href={`/perfil/${friend[0].user_id}`} className="text-xlfont-semibold">{friend[0].user_name}</a>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              onClick={(e) => { perfil(e, friend[0].user_id) }}
            >
              Eliminar Amigo
            </button>
          </div>
        ))}
      </div>
    </>

  );
};

export default FriendList;