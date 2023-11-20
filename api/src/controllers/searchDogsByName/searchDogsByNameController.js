const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1';

const searchDogsByName = async (name) => {
    try {
        const { data } = await axios(`${BASE_URL}/breeds/search?q=${name}`);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { searchDogsByName}