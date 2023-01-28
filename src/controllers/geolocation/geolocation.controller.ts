import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import asyncWrapper from '@/middlewares/async';

class GeolocationController implements Controller {
    public path = '/geolocation';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.route(this.path).post(this.findCity);
    }

    private findCity = asyncWrapper(async (req, res, next) => {});
}

export default GeolocationController;
