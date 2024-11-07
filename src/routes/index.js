const { Router } = require('express');
const pokemon = require('./routePoke');
const type = require('./routeType');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokemon);
router.use('/types', type)

module.exports = router;
