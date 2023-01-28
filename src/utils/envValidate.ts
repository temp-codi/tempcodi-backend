import { cleanEnv, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        PORT: port({ default: 3000 }),
    });
}

export default validateEnv;
