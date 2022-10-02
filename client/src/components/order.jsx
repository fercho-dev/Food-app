import { useDispatch } from 'react-redux';
import { sort } from '../store/actions'


export default function Order() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(sort(e.target.value));
    }

    return <div>
        <label htmlFor="order">Order by: </label>

        <select name="order" id="order" onChange={onSelectChange}>
        <option value="none">none</option>
        <option value="ascendent">ascendent</option>
        <option value="descendent">descendent</option>
        </select>
    </div>
}