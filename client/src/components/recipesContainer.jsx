import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes } from '../store/actions'
import Recipe from './recipe'
import Pagination from "./pagination"

export default function RecipesContainer() {    
    let recipes = useSelector((state) => state.filteredRecipes)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost)

    function paginate(e, pageNumber) {
        e.preventDefault()
        setCurrentPage(pageNumber)
    }

    return <div>
        {currentPosts.map((recipe) => {
            return <Recipe key={recipe.id} id={recipe.id} name={recipe.name} img={recipe.image}/>
        })}
        <Pagination postsPerPage={postsPerPage} totalPosts={recipes.length} paginate={paginate}/>
    </div>
}