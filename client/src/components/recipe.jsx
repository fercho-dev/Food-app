import { Link } from "react-router-dom"

export default function Recipe({ id, name, img }) {
    return <div>
        <Link to={`/recipes/${id}`}>
            <p>{name}</p>
            <img src={img} alt="recipe" />
        </Link>
    </div>
}