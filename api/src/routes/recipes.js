const { Router } = require('express');
const axios = require('axios')
const { Recipes, Diets } = require('../db')
const { API_KEY } = process.env;
const { Op } = require('sequelize')


const router = Router();

// get all recipes || or search
router.get('/', (req, res, next) => {
    let apiRecipesPromise = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=5&addRecipeInformation=true`)

    let searchQuery = req.query.search
    let dbRecipesPromise
    if(searchQuery) {
        dbRecipesPromise = Recipes.findAll({
            include: Diets,
            where: {
                name: {
                    [Op.iLike]: "%" + searchQuery + "%"
                }
            }
        })
    } else {
        dbRecipesPromise = Recipes.findAll({ include: Diets })
    }
    

    Promise.all([apiRecipesPromise, dbRecipesPromise])
    .then((response) => {
        const [apiRecipes, dbRecipes] = response
        let filteredApiRecipes
        if(searchQuery) {
            filteredApiRecipes = apiRecipes.data.results.filter(recipe =>
                recipe.title.toLowerCase().includes(searchQuery)
            )
            filteredApiRecipes = filteredApiRecipes.map((recipe) => {
                return {
                    id: recipe.id,
                    name: recipe.title.toLowerCase(),
                    health_score: recipe.healthScore,
                    image: recipe.image,
                    diets: recipe.diets
                }
            })
        } else {
            filteredApiRecipes = apiRecipes.data.results.map((recipe) => {
                return {
                    id: recipe.id,
                    name: recipe.title.toLowerCase(),
                    health_score: recipe.healthScore,
                    image: recipe.image,
                    diets: recipe.diets
                }  
            })
        }
        let filteredDbRecipes = dbRecipes.map((recipe) => {
            return {
                id: recipe.id,
                name: recipe.name,
                health_score: recipe.health_score,
                image: recipe.image,
                diets: recipe.diets
            }
        })
        let allRecipes = [...filteredDbRecipes, ...filteredApiRecipes]
        if(allRecipes.length === 0) {
            return res.status(204).send(allRecipes)
        }
        res.status(200).send(allRecipes)
    })
    .catch((error) => {
        next(error)
    })
})

// get recipe by id
router.get('/:id', async (req, res, next) => {
    try {
        const recipeId = req.params.id
        let recipe
        let filteredRecipe
        if(isNaN(recipeId)) {
            recipe = await Recipes.findByPk(recipeId, { include: Diets })
            filteredRecipe = recipe
        } else {
            let recipeRes = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
            recipe = recipeRes.data
            filteredRecipe = {
                id: recipe.id,
                name: recipe.title.toLowerCase(),
                description: recipe.summary,
                health_score: recipe.healthScore,
                cooking_steps: recipe.analyzedInstructions,
                image: recipe.image,
                diets: recipe.diets
            }
        }
        res.status(200).send(filteredRecipe)
    } catch(error) {
        next(error)
    }
})

// Crear recipe
router.post('/', async (req, res, next) => {
    try {
        const {name, description, health_score, cooking_steps, image} = req.body;
        const newRecipe = await Recipes.create({
            name: name.toLowerCase(),
            description: description.toLowerCase(),
            health_score,
            cooking_steps: cooking_steps.toLowerCase(),
            image,
        })
        res.status(201).send(newRecipe)
    } catch(error) {
        next(error)
    }  
})

// ruta para vincular recipe con diet
router.post('/:recipeId/:dietId', async (req, res, next) => {
    try {
        const { recipeId, dietId } = req.params
        const recipe = await Recipes.findByPk(recipeId)
        recipe.addDiet(dietId)
        res.sendStatus(201)
    } catch(error) {
        next(error)
    }
})

router.put('/', (req, res) => {
    res.send('soy put /recipes')
})

router.delete('/', (req, res) => {
    res.send('soy delete /recipes')
})

module.exports = router;