import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../store/actions'
import '../css/searchBar.css'

export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        try {
            dispatch(searchRecipes(search))
        } catch(error) {
            alert('Ups, there is no recipes')
            window.location.href = `/recipes`;
        } 
    }

    function onInputChange(e) {
        setSearch(e.target.value);
    }

    return <form className='searchBar' onSubmit={onSubmit}>
            <input className='searchText' type="text" onChange={onInputChange} placeholder='Cookies'/>
            <input className='searchBtn' type="submit" value="Search"/>
        </form>
}