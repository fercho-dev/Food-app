import { Link } from "react-router-dom"
import '../css/recipe.css'
import heart from '../assets/heart.png'

export default function Recipe({ id, name, img, hs, diets }) {
    return <Link className="card" to={`/recipes/${id}`}>
                <img src={img} alt="recipe" />
                <div className="card-info">
                    <p>{name}</p>
                    <div className="recipe-diets">
                        {diets.map((diet) => {
                            return <span className="diet" key={diet}>{diet}</span>
                        })}
                    </div>
                    <div className="hs">
                        <img src={heart} alt="" />
                        <span>{hs}</span>
                    </div>
                </div>
        </Link>
}