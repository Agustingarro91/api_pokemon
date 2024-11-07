const { Router } = require('express');
const { getPoke, getPokeId, getName, postPoke } = require('../controllers/controllersPoke');
//const {Type} = require('../db');

const routerPoke = Router();

routerPoke.get('/name', async (req, res) => {
    try {
        const {name} = req.query;
        const getNom = await getName(name);
        if(getNom.error) throw Error('No existe el nombre')
        return res.json(getNom);
    } catch (error) {
        return res.status(404).send(error.message)
    }

})

routerPoke.get('/', async (req, res) => {
    try {        
        const pokem = await getPoke();
        if(pokem.error) throw Error(pokem.error)
           return res.status(200).json(pokem);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


routerPoke.get('/:idPokemon', async (req, res) => {
    try {
        const {idPokemon} = req.params;
        const detail = await getPokeId(idPokemon)

        if(detail.error) throw Error(detail.error)
         return res.status(200).json(detail);
         
    } catch (error) {
        return res.status(404).send(error.message);
    }

})

routerPoke.post('/', async (req, res)=>{
    try {
        console.log(req.body);
        const nuevoPoke = await postPoke(req.body);
         if(nuevoPoke.error) throw Error(nuevoPoke.error);

         //await nuevoPoke.addPage(type);
         return res.status(200).json(nuevoPoke);

        
    } catch (error) {
        console.log(error.message);
        return res.status(404).send(error.message)
    }

})


module.exports = routerPoke;