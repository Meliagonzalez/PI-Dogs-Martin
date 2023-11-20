const { Router } = require('express');
const { getAllDogsHandler } = require('../handlers/getAllDogsHandler');
const { getDogDetailHandler } = require ('../handlers/getDogDetailHandler');
const { searchDogsByNameHandler } = require ('../handlers/searchDogsByNameHandler');
const { createNewDogHandler } = require ('../handlers/createDogHandler');
const { getTemperamentsHandler } = require('../handlers/getTemperamentsHandler');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get ('/dogs', getAllDogsHandler);
router.get('/dogs/name', searchDogsByNameHandler);
router.get('/dogs/:idRaza', getDogDetailHandler);
router.post('/dogs', createNewDogHandler);
router.get('/temperaments', getTemperamentsHandler);


module.exports = router;
