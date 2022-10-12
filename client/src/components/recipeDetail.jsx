import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import '../css/recipeDetail.css'
import heart from '../assets/heart.png'

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
            <div className="recipeDetail" id={recipe.id}>
                <div className="recipeDetail-innercontainer">
                    <div className="recipeDetail-info">
                        <div className="recipeDetail-name-hs">
                            <h2>{recipe.name}</h2>
                            <div className="recipeDetail-hs">
                                <img src={heart} alt="" />
                                <span>{recipe.health_score}</span>
                            </div>
                        </div>
                        {recipe.type ?
                        <p className="recipeDetail-type">{recipe.type.map((type) => {
                            return <span key={type}>{type}</span>
                        })}</p> :
                        null
                        }
                        <p className="recipeDetail-diets">{recipe.diets.map((diet) => {
                            if(typeof diet !== 'string') {
                                return <span key={diet.name}>{diet.name}</span>
                            }
                            return <span key={diet}>{diet}</span>
                        })}</p>
                        <p className="recipeDetail-desc" dangerouslySetInnerHTML={{__html: recipe.description}}></p>
                    </div>
                    <figure>
                        <img src={recipe.image} alt="food" />
                    </figure>
                </div>
                {
                    recipe.cooking_steps[0] ?
                    <details className="recipeDetail-instr">
                            <summary className="instr-text">
                                👩🏼‍🍳 Instructions:
                            </summary>
                            <ol className="instructions-list">
                                {recipe.cooking_steps[0].steps.map((step) => {
                                    return <li key={step.number}>{step.step}</li>
                                })}
                            </ol>
                    </details> :
                    <p></p>
                }
            </div> :
            <div>Loading</div>
        }
    </div>
}