import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterCompany } from '../../redux/stocks/stock';
import './search.css';

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterCompany(''));
  }, []);
  const [searchInput, setSearch] = useState('');
  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(filterCompany(e.target.value));
  };
  return (
    <>
      <input
        id="search"
        placeholder="Search a company..."
        value={searchInput}
        type="search"
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
