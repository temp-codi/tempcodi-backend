import { Request, Response, NextFunction } from 'express';
import RequestHandler from '@/utils/interfaces/requestHandler';

const asyncWrapper = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncWrapper;
