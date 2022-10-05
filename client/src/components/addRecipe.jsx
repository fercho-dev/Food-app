import '../css/addRecipe.css'
import { fetchDiets } from '../store/actions'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function AddRecipe() {
    let diets = useSelector((state) => state.diets)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDiets())
    }, [])

    const [dietsSelected, setDietsSelected] = useState({})

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        healthScore: '',
        diets: dietsSelected,
        cookingSteps: '',
        image: '',
        errors: {
            name: "Name of recipe is necessary",
            description: 'Description is necessary',
            healthScore: '',
            diets: '',
            cookingSteps: '',
            image: ''
        },
        disabled: true
    })

    function validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach((val) => {
            if(val.length > 0) {
                valid = false
            }
        });
        if(valid) {
          setInputs({
            ...inputs,
            disabled: false
          })
        } else {
          setInputs({
            ...inputs,
            disabled: true
          })
        }
      }

    function handleChange(e) {
        const { name, value } = e.target
        let errors = inputs.errors

        switch (name) {
            case 'name':
                errors.name = value.length < 5 ? 'Recipe name needs at least 5 characters' : '';
                break;
            case 'description':
                errors.description = value.length < 5 ? 'Recipe description needs at least 5 characters' : '';
                break;
            case 'healthScore':
                errors.healthScore = isNaN(value) ? 'Health score needs to be a number' : '';
                break;
            case 'cookingSteps':
                errors.cookingSteps = value.length < 5 ? 'Instructions need at least 5 characters' : '';
                break;
            case 'image':
                errors.image = value.startsWith('https://') === false && value.length > 0 ? 'Not a valid URL' : '';
                break;
            default:
                break;
        }

        inputs[name] = value
        setInputs({
            ...inputs,
            [name]: value,
            errors
        })

        validateForm(inputs.errors)
    }

    function handleDietsChecked(e) {
        const { name, checked } = e.target
        let newDiets = {...dietsSelected}
        newDiets[name] = checked
        newDiets = Object.fromEntries(Object.entries(newDiets).filter(([key, val]) => val === true))
        setDietsSelected(newDiets)
        setInputs({
            ...inputs,
            diets: newDiets
        })
    }

    async function submitForm(e) {
        e.preventDefault()
        let recipeCreated = await axios.post('http://localhost:3001/recipes', {
            name: inputs.name,
            description: inputs.description,
            health_score: +inputs.healthScore,
            cooking_steps: inputs.cookingSteps,
            image: inputs.image,
        })
        const { id } = recipeCreated.data
        let dietsIds = []
        for(let diet in dietsSelected) {
            let response = await axios.get(`http://localhost:3001/diets/${diet}`)
            let dietId = response.data[0].id
            await axios.post(`http://localhost:3001/recipes/${id}/${dietId}`)
        }
    }

    return <form onSubmit={submitForm}>
        <label htmlFor="name">Recipe name: </label>
        <input type="text" name='name' id='name' onChange={handleChange}/>
        {!inputs.errors.name ? null : <div>{inputs.errors.name}</div>}

        <label htmlFor="description">Recipe description: </label>
        <input type="text" name='description' id='description' onChange={handleChange}/>
        {!inputs.errors.description ? null : <div>{inputs.errors.description}</div>}

        <label htmlFor="healthScore">Health score: </label>
        <input type="text" name='healthScore' id='healthScore' onChange={handleChange}/>
        {!inputs.errors.healthScore ? null : <div>{inputs.errors.healthScore}</div>}

        <p htmlFor="diets">Type of diet: </p>
        <div>
            {diets.map((diet) => {
                return <div key={diet.id}>
                <label htmlFor={diet.id}>{diet.name}</label>
                <input type="checkbox" name={diet.name} id={diet.id} onChange={handleDietsChecked}/>
            </div>
            })}
        </div>

        <label htmlFor="cookingSteps">Cooking steps: </label>
        <input type="text" name='cookingSteps' id='cookingSteps' onChange={handleChange}/>
        {!inputs.errors.cookingSteps ? null : <div>{inputs.errors.cookingSteps}</div>}

        <label htmlFor="image">Image url: </label>
        <input type="text" name='image' id='image' onChange={handleChange}/>
        {!inputs.errors.image ? null : <div>{inputs.errors.image}</div>}

        <input type="submit" value='Create' disabled={inputs.disabled}/>
    </form>
}