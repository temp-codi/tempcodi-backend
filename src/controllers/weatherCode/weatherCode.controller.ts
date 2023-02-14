import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './weatherCode.validation';
import codeArr from '@/utils/weatherCodes';

class GetWeatherCode implements Controller {
    public path = '/getCode';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(validationMiddleware(validate.create), this.getWeatherCode);
    }

    private getWeatherCode = asyncWrapper(async (req, res) => {
        try {
            const { code } = req.body;
            const weatherData = codeArr.filter((item) => {
                return Number(item.id) === Number(code);
            });
            if (weatherData.length === 0) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ msg: 'wrong weather code' });
            }
            return res
                .status(StatusCodes.OK)
                .json({ msg: 'success', data: weatherData[0] });
        } catch {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'server error',
            });
        }
    });
}

export default GetWeatherCode;
