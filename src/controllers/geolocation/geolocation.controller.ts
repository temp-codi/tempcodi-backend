import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import validate from './geolocation.validation';
import { reverseGeoApi } from '@/api/index';
import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';

class GeolocationController implements Controller {
    public path = '/geolocation';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(validationMiddleware(validate.create), this.findCity);
    }

    private findCity = asyncWrapper(async (req, res) => {
        try {
            const { lat, lon } = req.body;
            const cityInfo = await reverseGeoApi(lat, lon);
            return res.status(StatusCodes.OK).json({ cityInfo });
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'problem with geolocation api - check bigDataCloud',
            });
        }
    });
}

export default GeolocationController;
