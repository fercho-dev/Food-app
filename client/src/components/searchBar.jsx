import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../store/actions'
import '../css/searchBar.css'

export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchRecipes(search))
    }

    function onInputChange(e) {
        setSearch(e.target.value);
    }

    return <div>
        <form className='searchBar' onSubmit={onSubmit}>
            <input className='searchText' type="text" onChange={onInputChange} placeholder='Cookies'/>
            <input className='searchBtn' type="submit" value="Search"/>
        </form>
    </div>
}