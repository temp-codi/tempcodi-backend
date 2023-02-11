import { Router } from 'express';
import { useOpenGPT } from '@/api/index';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './openAi.validation';
import { extractItems } from '@/utils/extractItems';

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
            const { weather, gender } = req.body;
            const response = await useOpenGPT(weather, gender);
            const {
                data: {
                    choices: [{ text }],
                },
            } = response;

            const arr = extractItems(text);
            return res.status(StatusCodes.OK).json({ response: arr });
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'problem with openai api',
            });
        }
    });
}
export default OpenAiController;
