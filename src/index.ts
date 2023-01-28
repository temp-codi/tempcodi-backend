import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/envValidate';
import { GeolocationController } from './controllers';

validateEnv();

const app = new App([new GeolocationController()], Number(process.env.PORT));

app.listen();
