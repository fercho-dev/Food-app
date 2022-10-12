import '../css/addRecipe.css'
import { fetchDiets } from '../store/actions'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from 'axios'
import cooking from '../assets/cooking.png'

export default function AddRecipe() {
    let diets = useSelector((state) => state.diets)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDiets())
    }, [])

    const [newDietInput, setNewDietInput] = useState('')

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
        let submitBtn = document.getElementById("submit-btn");
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
          submitBtn.classList.add("submit-btn-active")
        } else {
          setInputs({
            ...inputs,
            disabled: true
          })
          submitBtn.classList.remove("submit-btn-active")
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
        try {
            let defaultImage = 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            let recipeCreated = await axios.post('http://localhost:3001/recipes', {
                name: inputs.name,
                description: inputs.description,
                health_score: +inputs.healthScore,
                cooking_steps: inputs.cookingSteps,
                image: inputs.image === '' ? defaultImage : inputs.image,
            })
            const { id } = recipeCreated.data
            for(let diet in dietsSelected) {
                let response = await axios.get(`http://localhost:3001/diets/${diet}`)
                let dietId = response.data[0].id
                await axios.post(`http://localhost:3001/recipes/${id}/${dietId}`)
            }
            alert('Yeah, your recipe was succesfully created')
            window.location.href = "/recipes";
        } catch(error) {
            alert(`Ups, something went wrong. Try again.\n${error}`)
        }
    }

    function newDietChange(e) {
        setNewDietInput(e.target.value);
    }

    function addDiet() {
        axios.post('http://localhost:3001/diets', {name: newDietInput})
        .then((response) => {
            dispatch(fetchDiets())
        })
        .catch((error) => {
            alert('Seems like that diet already exists')
        })
    }

    return <div>
    <h2 className='form-header'>🍔 Share your recipes with the world!</h2>
    <div className='form-container'> 
        <form onSubmit={submitForm}>
            <label className='form-label' htmlFor="name">Recipe name: </label>
            <input className='form-input' type="text" name='name' id='name' onChange={handleChange} placeholder="Royale with cheese"/>
            {!inputs.errors.name ? null : <p className='input-error'>{inputs.errors.name}</p>}

            <label className='form-label' htmlFor="description">Recipe description: </label>
            <input className='form-input' type="text" name='description' id='description' onChange={handleChange} placeholder="A classic quarter pounder with cheese"/>
            {!inputs.errors.description ? null : <p className='input-error'>{inputs.errors.description}</p>}

            <label className='form-label' htmlFor="healthScore">Health score: </label>
            <input className='form-input' type="text" name='healthScore' id='healthScore' onChange={handleChange} placeholder="45"/>
            {!inputs.errors.healthScore ? null : <p className='input-error'>{inputs.errors.healthScore}</p>}

            <p className='form-label' htmlFor="diets">Type of diet: </p>
            <div className='diets-container'>
                <div className='diets-checkboxes'>
                    {diets.map((diet) => {
                        return <div className='diet-option' key={diet.id}>
                        <label htmlFor={diet.id}>{diet.name}</label>
                        <input type="checkbox" name={diet.name} id={diet.id} onChange={handleDietsChecked}/>
                        </div>
                    })}
                </div>
                <div className='diets-add-new'>
                    <label htmlFor="newDiet">Add new diet: </label>
                    <input type="text" name='newDiet' id='newDiet' onChange={newDietChange} placeholder="Add new diet:"/>
                    <span onClick={addDiet}>+</span>
                </div>
            </div>

            <label className='form-label' htmlFor="cookingSteps">Cooking steps: </label>
            <input className='form-input' type="text" name='cookingSteps' id='cookingSteps' onChange={handleChange}/>
            {!inputs.errors.cookingSteps ? null : <p className='input-error'>{inputs.errors.cookingSteps}</p>}

            <label className='form-label' htmlFor="image">Image url: </label>
            <input className='form-input' type="text" name='image' id='image' onChange={handleChange} placeholder="https://my-image.png"/>
            {!inputs.errors.image ? null : <p className='input-error'>{inputs.errors.image}</p>}

            <input className='submit-btn' id='submit-btn' type="submit" value='Create' disabled={inputs.disabled}/>
        </form>
        <figure>
            <img src={cooking} alt="" />
        </figure>
    </div>
    </div>
}