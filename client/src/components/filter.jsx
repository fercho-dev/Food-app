import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../store/actions'
import { fetchDiets } from '../store/actions'
import '../css/filter.css'


export default function Filter() {
    let diets = useSelector((state) => state.diets)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDiets())
    }, [])

    function onSelectChange(e) {
        dispatch(filter(e.target.value));
    }

    return <div className='filterByContainer'>
        <label htmlFor="order">Filter by diet: </label>

        <select name="order" id="order" onChange={onSelectChange}>
        <option value="all">all</option>
        {diets.map((diet) => {
            return <option key={diet.id} value={diet.name} onChange={onSelectChange}>{diet.name}</option>
        })}
        </select>
    </div>
}