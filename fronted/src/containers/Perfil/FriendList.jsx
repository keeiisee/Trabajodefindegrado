import React from 'react';

const FriendList = ({ friends }) => {

    console.log(friends)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {friends.map((friend) => (
        <div
          key={friend[0].id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            className="w-32 h-32 mx-auto mb-4 rounded-full"
            src={friend[0].imagen}
            alt={`${friend[0].user}'s avatar`}
          />
          <h3 className="text-xl font-semibold">{friend[0].user}</h3>
        </div>
      ))}
    </div>
  );
};

export default FriendList;