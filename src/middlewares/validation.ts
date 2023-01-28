import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import BadRequest from './bad-request';

const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
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
            // check e.name (joi library => validationError, validationErrorItem => can see more details on error ex) path, message, type
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            const badRequest = new BadRequest(errors.join(', '), errors);
            res.status(badRequest.statusCode).send({
                message: badRequest.errors,
            });
        }
    };
};

export default validationMiddleware;
