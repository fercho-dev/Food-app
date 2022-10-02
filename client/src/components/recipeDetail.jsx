import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then((response) => {
            setRecipe(response.data)
        })
    }, [])

    return <div>
        {
            recipe ?
            <div>
                <h1>Welcome to recipe detail</h1>
                <h3>{recipe.name}</h3>
                <img src={recipe.image} alt="food" />
            </div> :
            <div>Loading</div>
        }
    </div>
}