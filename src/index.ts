import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/envValidate';
import { GeolocationController, GoogleImgController } from './controllers';

validateEnv();

const app = new App(
    [new GeolocationController(), new GoogleImgController()],
    Number(process.env.PORT)
);

app.listen();
