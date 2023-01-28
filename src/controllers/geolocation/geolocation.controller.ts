import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import asyncWrapper from '@/middlewares/async';
import validate from './geolocation.validation';
import validationMiddleware from '@/middlewares/validation';

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

    private findCity = asyncWrapper(async (req, res, next) => {});
}

export default GeolocationController;
