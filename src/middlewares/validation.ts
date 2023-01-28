import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import BadRequest from './bad-request';
import NotFoundError from './not-found';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            if (e.name === 'ValidationError') {
                const errors: string[] = [];
                e.details.forEach((error: Joi.ValidationErrorItem) => {
                    errors.push(error.message);
                });
                throw new BadRequest(errors.join(', '));
            } else {
                throw new NotFoundError(e.message);
            }
        }
    };
}

export default validationMiddleware;
