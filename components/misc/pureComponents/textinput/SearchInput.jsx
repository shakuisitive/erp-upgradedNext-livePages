import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({ placeholder, onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="search-input-container flex items-center border border-gray-200 w-80 px-3  rounded-lg hover:border-gray-400 focus:outline-none">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="search-input flex-grow  focus:outline-none "
      />
      <button
        onClick={handleSearch}
        className="search-button p-2 "
      >
        <FiSearch className='text-2xl p-1 text-[1.8rem] text-gray-400 rounded-sm hover:bg-gray-200'  />
      </button>
    </div>
  );
};

export default SearchInput;

