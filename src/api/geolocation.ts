import axios from 'axios';

const reverseGeoApi = async (lat: string, lon: string) => {
    return await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    );
};

export default reverseGeoApi;
