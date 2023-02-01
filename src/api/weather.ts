import axios from 'axios';

export const getTempData = async (city_name: string) => {
    const {
        data: { list },
    } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${process.env.WEATHER_API}&units=metric`
    );

    return list;
};

export const pollutionApi = async (lat: string, lon: string) => {
    const {
        data: { list },
    } = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
    );
    const {
        main: { aqi },
    } = list[0];

    return aqi;
};
