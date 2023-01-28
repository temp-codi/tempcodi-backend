import axios from 'axios';

const reverseGeoApi = async (lat: string, lon: string) => {
    const {
        data: {
            results: [{ components }],
        },
    } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=e8c5f280f4f64f7c93e8634aac3ffaaf&q=52.3877830%2C9.7334394&pretty=1`
    );
    return components;
};

export default reverseGeoApi;
