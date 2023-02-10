import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './weather.validation';
import City from './weather.model';
import { getTempData, pollutionApi } from '@/api/weather';
import { pollutionCalc } from '@/utils/pollutionCalc';

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

            const weatherData = await getTempData(city);
            const pollutionData = await pollutionApi(lat, lon);
            const pollutionIndex = pollutionCalc(pollutionData);
            const { en, kr } = pollutionIndex;
            console.log(pollutionIndex);

            const response = await City.create({
                city_name: city, // req.body data
                api_called_date: new Date(),
                list: [],
                pollution_en: en,
                pollution_kr: kr,
            });
            console.log(response);

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

    private isCalledToday = async () => {};
}

export default CreateOrUpdateCityTemp;
