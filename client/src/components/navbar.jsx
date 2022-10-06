import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return <div>
        <NavLink exact to="/" activeClassName="active" >Landing</NavLink>
        <NavLink to="/recipes" activeClassName="active" >Recipes</NavLink>
        <NavLink to="/recipes/create" activeClassName="active">Create</NavLink>
    </div>
}