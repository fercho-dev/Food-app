import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../store/actions'

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
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange}/>
            <input type="submit" value="Search"/>
        </form>
    </div>
}