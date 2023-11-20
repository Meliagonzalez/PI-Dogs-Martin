const axios = require('axios');
const { Temperament } = require ('../../db')
const BASE_URL = 'https://api.thedogapi.com/v1';

const getTemperamentsFromApi = async () => {
    try {
        const { data } = await axios(`${BASE_URL}/breeds`);
        let temperaments = [];
        data.forEach(dog => {
            if (dog.temperament){ 
                const temperamentos = dog.temperament.split (', ')
            temperamentos.forEach(temperamento => {
                if (!temperaments.includes(temperamento)) {
                    temperaments.push(temperamento)
                } 
            })
        }
        });

        const TemperamentsDB = await Promise.all(temperaments.map(async temperament => {
            const [temp, created] = await Temperament.findOrCreate({where: {name:temperament}, default: {name:temperament}})
            return temp;
        })) 
        return TemperamentsDB;
        
    } catch (error) {
        throw error;
    }
}

module.exports = { getTemperamentsFromApi };