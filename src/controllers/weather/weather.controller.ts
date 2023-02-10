import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './weather.validation';
import WeatherService from './weather.service';
class CreateOrUpdateCityTemp implements Controller {
    public path = '/temp';
    public router = Router();

    private WeatherService = new WeatherService();

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

            const isExist = await this.WeatherService.isCityExist(city);

            if (!isExist) {
                const newCityWeatherData =
                    await this.WeatherService.createNewCityWeatherData({
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
}

export default CreateOrUpdateCityTemp;
