import React from 'react'
// import { useState, useEffect } from 'react';
import FlagsDropdown from './FlagsDropdown';
import { FaSearch } from 'react-icons/fa';
import { useRef } from 'react';
// import nl.png from '../';

function SearchCity({ search, setSearch, submit, selectFlag, countries, codes, codesString, setEmptyFlag }) {
  const searchRef = useRef(null)

  const onSubmit = e => {
    // console.log(searchRef.current.value)

    e.preventDefault();
    // if (!search || search === '' || /^[0-9]+$/.test(search)) {
    if (!searchRef.current.value || searchRef.current.value === '' || /^[0-9]+$/.test(searchRef.current.value)) {

      setEmptyFlag(true)
    } else {
      console.log(searchRef.current.value)
      setSearch(searchRef.current.value)
      submit();

    }
  };

  return (

    // <div>SearchCity</div> 
    <form className='searchForm' onSubmit={onSubmit}>
      {/* <label htmlFor='search'>Search</label> */}
      <div className='form-container'>
        <img src="../images/clear-sky.png" alt="sun_with_cloud" />
        <FlagsDropdown codes={codes} codesString={codesString} selectFlag={selectFlag}
        />
        <div className='input-container'>
          <input
            id='search'
            type='text'
            placeholder='Search for city'
            ref={searchRef}
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          />
          <button className='search-button' role='button' type='submit' > <FaSearch /></button>
        </div>
      </div>



    </form >
  )
}

export default SearchCity