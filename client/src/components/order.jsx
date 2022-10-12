import { useDispatch } from 'react-redux';
import { sort } from '../store/actions'
import '../css/order.css'


export default function Order() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(sort(e.target.value));
    }

    return <div className='orderByContainer'>
        <label htmlFor="order">Order by: </label>

        <select name="order" id="order" onChange={onSelectChange}>
        <option value="none">None</option>
        <option value="ascendent">A-Z</option>
        <option value="descendent">Z-A</option>
        <option value="high">Highest health score</option>
        <option value="low">Lowest health score</option>
        </select>
    </div>
}