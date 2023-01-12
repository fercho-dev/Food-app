const { Router } = require('express');
// const { Diets, Recipes } = require('../db')
// const { Op } = require('sequelize')
const axios = require('axios')


const router = Router();

// get all diets
router.get('/', async (req, res, next) => {
    try {
        // const dietsRes = await Diets.findAll({ include: Recipes })
        // if(dietsRes.length === 0) {
        //     let dietsCreated = await axios.post('http://localhost:3001/diets/init')
        //     res.status(200).send(dietsCreated.data)
        // } else {
        //     res.status(200).send(dietsRes)
        // }
        const diets = [
            {
                id: 0,
                name: 'gluten free'
            },
            {
                id: 1,
                name: 'ketogenic'
            },
            {
                id: 2,
                name: 'lacto ovo vegetarian'
            },
            {
                id: 3,
                name: 'vegan'
            },
            {
                id: 4,
                name: 'paleolithic'
            },
            {
                id: 5,
                name: 'primal'
            },
            {
                id: 6,
                name: 'whole 30'
            },
            {
                id: 7,
                name: 'dairy free'
            },
        ]
        res.status(200).send(diets);
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
        const dietsInit = ['gluten free', 'ketogenic', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'whole 30', 'dairy free']
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