import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes } from '../store/actions'
import Recipe from './recipe'

export default function RecipesContainer() {
    let recipes = useSelector((state) => state.filteredRecipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])
    return <div>
        {recipes.map((recipe) => {
            return <Recipe key={recipe.id} id={recipe.id} name={recipe.name} img={recipe.image}/>
        })}
    </div>
}