import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes } from '../store/actions'
import Recipe from './recipe'
import Pagination from "./pagination"
import '../css/recipesContainer.css'

export default function RecipesContainer() {    
    let recipes = useSelector((state) => state.filteredRecipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost)

    function paginate(e, pageNumber) {
        e.preventDefault()
        setCurrentPage(pageNumber)
    }

    function onRecipesPerPageChange(e) {
        setPostsPerPage(parseInt(e.target.value))
    }

    return <div>
        <div className="recipesGrid">
            {currentPosts.map((recipe) => {
                return <Recipe key={recipe.id} id={recipe.id} name={recipe.name} img={recipe.image} hs={recipe.health_score} diets={recipe.diets}/>
            })}
        </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={recipes.length} paginate={paginate} currentPage={currentPage} onRecipesPerPageChange={onRecipesPerPageChange}/>
    </div>
}