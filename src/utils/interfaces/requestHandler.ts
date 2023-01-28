import { Request, Response, NextFunction } from 'express';

interface RequestHandler {
    (req: Request, res: Response, next?: NextFunction): Promise<any>;
}

export default RequestHandler;
