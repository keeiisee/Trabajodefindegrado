import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFriend } from '../../actions/auth';

const FriendList = ({ friends }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function perfil(e, id){
        e.preventDefault()
        dispatch(removeFriend(id))
        window.location.reload()
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {friends.map((friend) => (
        <>
        <div
          key={friend[0].id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
           
          <img
         
            className="w-30 h-30 rounded inline-block mr-1"
            src={friend[0].imagen}
            alt={`${friend[0].user}'s avatar`}
          />
          <button onClick={(e)=>{perfil(e, friend[0].user_id)}}>Eliminar Amigo</button>
          <a href={`/perfil/${friend[0].user_id}`}  className="text-xl font-semibold">{friend[0].user_name}</a>
        </div>
        </>
        
        
      ))}
    </div>
  );
};

export default FriendList;