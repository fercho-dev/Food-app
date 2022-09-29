const { Router } = require('express');
const { Diets, Recipes } = require('../db')


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const dietsRes = await Diets.findAll({ include: Recipes})
        res.send(dietsRes)
    } catch(error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    const { name } = req.body
    return Diets.create({ name })
    .then((newDiet) => {
        res.send(newDiet)
    })
    .catch((error) => {
        next(error)
    })
})

router.put('/', (req, res) => {
    res.send('soy put /diets')
})

router.delete('/', (req, res) => {
    res.send('soy delete /diets')
})

module.exports = router;