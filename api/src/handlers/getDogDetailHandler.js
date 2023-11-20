const { getDogDetail } = require('../controllers/getDogDetail/getDogDetailController');

const getDogDetailHandler = async (req, res) => {
    const { idRaza } = req.params;
    try {
        const dogDetail = await getDogDetail(idRaza);
        return res.status(200).json(dogDetail);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { getDogDetailHandler };
