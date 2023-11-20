const { Dog, Temperament } = require('../../db'); 
const getAllDogsDb = async () => {
    try {
        const dogsFromDb = await Dog.findAll({
            include: Temperament 
        });
        return dogsFromDb;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllDogsDb };
