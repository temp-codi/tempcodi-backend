import axios from 'axios';

/** 좌표로 도시 정보 반환 */
const reverseGeoApi = async (lat: string, lon: string) => {
    const {
        data: {
            results: [{ components }],
        },
    } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.OPEN_CAGE_API_KEY}`
    );
    return components;
};

export default reverseGeoApi;
