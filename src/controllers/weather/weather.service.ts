import City from './weather.model';
import { getTempData, pollutionApi } from '@/api/weather';
import {
    extractWeatherData,
    pollutionCalc,
    validateApiToday,
} from '@/utils/index';

class WeatherService {
    public isCityExist = async (city: string): Promise<boolean | null> => {
        return await City.findOne({ city_name: city });
    };

    public createNewCityWeatherData = async ({
        city,
        lat,
        lon,
    }: ICreateWeather) => {
        const weatherDataApi = await getTempData(city);
        const updatedWeatherData = extractWeatherData(weatherDataApi);

        const pollutionData = await pollutionApi(lat, lon);
        const pollutionIndex = pollutionCalc(pollutionData);

        const { en, kr } = pollutionIndex;

        return await City.create({
            city_name: city,
            api_called_date: new Date(),
            list: updatedWeatherData,
            pollution_en: en,
            pollution_kr: kr,
        });
    };

    public isCalledToday = async () => {};
}

interface ICreateWeather {
    city: string;
    lat: string;
    lon: string;
}

export default WeatherService;
