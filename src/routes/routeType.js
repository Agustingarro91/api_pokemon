const { Router } = require('express');
const {getType, getTypes} = require('../controllers/controllerType');

const routerType = Router();

routerType.get('/', async (req,res)=>{
    try {
        const tipos = await getType();
        if(tipos.error) throw Error(tipos.error);

        return res.status(200).json(tipos);

    } catch (error) {
        return  res.status(404).send(error.message)
    }
})

routerType.get('/db', async (req,res)=>{
    try {
        const tipos = await getTypes();
        if(tipos.error) throw Error(tipos.error);

        return res.status(200).json(tipos);

    } catch (error) {
        return  res.status(404).send(error.message)
    }
})

module.exports = routerType;