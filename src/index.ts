import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/envValidate';
import {
    GeolocationController,
    GoogleImgController,
    CreateOrUpdateCityTemp,
} from './controllers';

validateEnv();

const app = new App(
    [
        new GeolocationController(),
        new GoogleImgController(),
        new CreateOrUpdateCityTemp(),
    ],
    Number(process.env.PORT)
);

app.listen();
