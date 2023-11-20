const { getDogsApi } = require("../controllers/getAllDogs/getAllDogsAPI");
const { getAllDogsDb } = require ('../controllers/getAllDogs/getAllDogsDb');
const getAllDogsHandler = async (req, res) => {
    try {
        const dogsFromApi = await getDogsApi();
        const dogsFromDb = await getAllDogsDb();
        if (!dogsFromApi || !dogsFromDb ){
            throw Error ('No se encuentran perros')
        }
        const dogsFromApiandDb = await [...dogsFromApi, ...dogsFromDb]
        return res.status(200).json(dogsFromApiandDb)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = { getAllDogsHandler };
