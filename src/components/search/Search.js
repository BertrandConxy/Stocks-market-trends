import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { filterCompany } from '../../redux/stocks/stock';
import { useEffect } from 'react';

const Search = () => {
useEffect(()=> {
  dispatch(filterCompany(''))
}, [])
    const dispatch = useDispatch();
    const [searchInput, setSearch] = useState('');
    const handleChange = (e) => {
        setSearch(e.target.value);
        dispatch(filterCompany(e.target.value));
    }
  return (
    <input placeholder='search company' value={searchInput} role='search' onChange={handleChange}></input>
  )
}

export default Search;