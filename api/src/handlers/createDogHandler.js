const { createNewDog } = require('../controllers/createDog/createDogController');

const createNewDogHandler = async (req, res) => {
    const dogData = req.body;
    try {
        await createNewDog(dogData);
        return res.status(201).json({ message: 'El perro fue creado exitosamente'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createNewDogHandler };