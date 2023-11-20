const { getTemperamentsFromApi } = require ('../controllers/getTemperaments/getTemperamentsController');

const getTemperamentsHandler = async (req, res) => { 
    try {
        const temperaments = await getTemperamentsFromApi();
        return res.status(200).json(temperaments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getTemperamentsHandler };