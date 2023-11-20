const { searchDogsByName } = require ('../controllers/searchDogsByName/searchDogsByNameController');

const searchDogsByNameHandler = async  (req, res) => {
    const { name } = req.query;
    try {
        const dogsByName = await searchDogsByName(name);
        return res.status(200).json(dogsByName);
    } catch (error) {
        return res.status(404).json({ error: error.message})

    }
}

module.exports = { searchDogsByNameHandler }