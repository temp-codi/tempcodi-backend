import { Router } from 'express';
import { useOpenGPT } from '@/api/index';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './openAi.validation';

class OpenAiController implements Controller {
    public path = '/openai';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(
                validationMiddleware(validate.create),
                this.getOpenAiresponse
            );
    }

    private getOpenAiresponse = asyncWrapper(async (req, res) => {
        try {
            const { weather } = req.body;
            const response = await useOpenGPT(weather);
            const {
                data: {
                    choices: [{ text }],
                },
            } = response;
            console.log(text);
            return res.status(StatusCodes.OK).json({ response: text });
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'problem with openai api',
            });
        }
    });
}
export default OpenAiController;
