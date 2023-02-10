import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './weather.validation';
import City from './weather.model';
import { getTempData, pollutionApi } from '@/api/weather';
import {
    extractWeatherData,
    pollutionCalc,
    validateApiToday,
} from '@/utils/index';
import {
    IApiWeatherData,
    IUpdatedWeatherData,
} from '@/utils/interfaces/weather';

class CreateOrUpdateCityTemp implements Controller {
    public path = '/temp';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(
                validationMiddleware(validate.create),
                this.createOrUpdateCityTemp
            );
    }

    private createOrUpdateCityTemp = asyncWrapper(async (req, res) => {
        try {
            const { lat, lon, city } = req.body;

            const isExist = await this.isCityExist(city);

            if (!isExist) {
                const newCityWeatherData = await this.createNewCityWeatherData({
                    city,
                    lat,
                    lon,
                });
                return res
                    .status(StatusCodes.OK)
                    .json({ msg: 'success', data: newCityWeatherData });
            }

            return res.status(StatusCodes.OK).json({ msg: 'success' });
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'mongoDB error',
            });
        }
    });

    private isCityExist = async (city: string): Promise<boolean | null> => {
        return await City.findOne({ city_name: city });
    };

    private createNewCityWeatherData = async ({
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

    private isCalledToday = async () => {};
}

interface ICreateWeather {
    city: string;
    lat: string;
    lon: string;
}

export default CreateOrUpdateCityTemp;
