import { NavLink } from 'react-router-dom';
import '../css/navbar.css'
import { communityRecipes, reloadRecipes } from '../store/actions'
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const dispatch = useDispatch()
    function communityBtn() {
        dispatch(communityRecipes())
    }
    function recipesBtn() {
        dispatch(reloadRecipes())
    }
    return <header>
        <div>
            <NavLink className='link' exact to="/" activeClassName="active" >
                <span className='box'>Landing</span>
            </NavLink>
            <NavLink onClick={recipesBtn} className='link' to="/recipes" activeClassName="active" >
                <span className='box'>Recipes</span>
            </NavLink>
            <NavLink onClick={communityBtn} className='link' to="/recipes/community" activeClassName="active" >
                <span className='box'>Community</span>
            </NavLink>
        </div>
        <NavLink className='link linkCreate' to="/recipes/create" activeClassName="active">
            <span className='box'>Create recipe</span>
        </NavLink>
    </header>
}