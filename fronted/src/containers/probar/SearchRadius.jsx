import React from 'react';

const SearchRadius = ({ setRadius }) => {
  const handleChange = (event) => {
    setRadius(parseInt(event.target.value, 10));
  };

  return (
    <div className="p-4">
      <label htmlFor="radius">Distancia (metros): </label>
      <input
        type="number"
        id="radius"
        min="100"
        max="5000"
        step="100"
        defaultValue="1000"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchRadius;