import { cleanEnv, str, port } from 'envalid';

const validateEnv = (): void => {
    cleanEnv(process.env, {
        MONGO_URI: str(),
        WEATHER_API: str(),
        GOOGLE_API_KEY: str(),
        GOOGLE_SEARCH_ENGINE_ID: str(),
        OPEN_GPT_API_KEY: str(),
        GEO_CODING: str(),
        PORT: port({ default: 3000 }),
        OPEN_CAGE_API_KEY: str(),
    });
};

export default validateEnv;
