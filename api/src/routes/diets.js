const { Router } = require('express');
const { Diets, Recipes } = require('../db')
const { Op } = require('sequelize')
const axios = require('axios')


const router = Router();

// get all diets
router.get('/', async (req, res, next) => {
    try {
        const dietsRes = await Diets.findAll({ include: Recipes })
        if(dietsRes.length === 0) {
            let dietsCreated = await axios.post('http://localhost:3001/diets/init')
            res.status(200).send(dietsCreated.data)
        } else {
            res.status(200).send(dietsRes)
        }
    } catch(error) {
        next(error)
    }
})

// get diet by name
router.get('/:name', (req, res, next) => {
    const diet = req.params.name.toLocaleLowerCase()
    Diets.findAll({
        include: Recipes,
        where: {
            name: {
                [Op.iLike]: "%" + diet + "%"
            }
        }
    })
    .then((diet) => {
        if(diet.length === 0) {
            return res.status(204).send(diet)
        }
        res.status(200).send(diet)
    })
})

// post new diet
router.post('/', (req, res, next) => {
    const { name } = req.body
    return Diets.create({ name: name.toLowerCase() })
    .then((newDiet) => {
        res.status(201).send(newDiet)
    })
    .catch((error) => {
        next(error)
    })
})

// post init diets
router.post('/init', async (req, res, next) => {
    try {
        const dietsInit = ['gluten free', 'ketogenic', 'vegetarian', 'lacto', 'ovo', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30']
        const dietsCreated = []
        
        for(item of dietsInit) {
            const newDiet = await Diets.create({ name: item })
            dietsCreated.push(newDiet)
        }

        res.status(201).send(dietsCreated)
    } catch(error) {
        next(error)
    }
})

router.put('/', (req, res) => {
    res.send('soy put /diets')
})

router.delete('/', (req, res) => {
    res.send('soy delete /diets')
})

module.exports = router;