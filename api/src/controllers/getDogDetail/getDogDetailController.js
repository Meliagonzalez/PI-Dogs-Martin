const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1';

const getDogDetail = async (breedId) => {
    try {
        const { data } = await axios (`${BASE_URL}/breeds/${breedId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDogDetail };