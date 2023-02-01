import { Router } from 'express';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import validate from './weather.validation';
import City from './weather.model';

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
        const { lat, lon, city } = req.body;
        try {
        } catch (err) {}
    });

    private isCityExist = async (city: string): Promise<boolean> => {
        return await City.findOne({ city_name: city });
    };

    private isCalledToday = async () => {};
}

export default CreateOrUpdateCityTemp;
