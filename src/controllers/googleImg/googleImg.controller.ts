import { Router } from 'express';
import { getGoogleSearchImgs } from '@/api/index';
import Controller from '@/utils/interfaces/controller';
import { asyncWrapper, validationMiddleware } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import validate from './googleImg.validation';

class GoogleImgController implements Controller {
    public path = '/googleimg';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(validationMiddleware(validate.create), this.searchImg);
    }

    private searchImg = asyncWrapper(async (req, res) => {
        try {
            const { keyword, pageNo, gender } = req.body;
            console.log(keyword, pageNo, gender);
            const googleInfo = await getGoogleSearchImgs({
                keyword,
                pageNo,
                gender,
            });
            return res.status(StatusCodes.OK).json({ googleInfo });
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'problem with googleImg api - check bigDataCloud',
            });
        }
    });
}

export default GoogleImgController;
