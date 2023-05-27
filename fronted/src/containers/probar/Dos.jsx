import React from 'react'
//no
export const Dos = () => {
    const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
};

return (
  <div className="container mx-auto p-4">
    <input
      type="text"
      className="border-2 border-gray-300 p-2 w-full"
      placeholder="Buscar por nombre"
      onChange={handleSearchChange}
    />
  </div>
);
}
