import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/envValidate';
import {
    GeolocationController,
    GoogleImgController,
    CreateOrUpdateCityTemp,
    OpenAiController,
    GetWeatherCodeController,
} from './controllers';

validateEnv();

const app = new App(
    [
        new GeolocationController(),
        new GoogleImgController(),
        new CreateOrUpdateCityTemp(),
        new OpenAiController(),
        new GetWeatherCodeController(),
    ],
    Number(process.env.PORT)
);

app.listen();
