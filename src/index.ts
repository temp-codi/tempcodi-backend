import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/envValidate';

validateEnv();

const app = new App([], 8280);

app.listen();
