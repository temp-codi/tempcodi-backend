import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
const xss = require('xss-clean');
import Controller from '@/utils/interfaces/controller';
import { errorMiddleware } from '@/middlewares/index';
import mongoose from 'mongoose';

// swagger
import * as path from 'path';
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeHome();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeSwagger();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(xss());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.set('trust proxy', 1);
        this.express.use(
            rateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
            })
        );
        this.express.use(compression()); // makes api request super fast (268.75 faster)
    }

    private initializeHome(): void {
        this.express.get('/', (req, res) => {
            console.log(req);
            res.redirect('/api-docs');
        });
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initializeSwagger(): void {
        const swaggerDoc = YAML.load(
            path.join(__dirname, '../build/swagger.yaml')
        );
        this.express.use(
            '/api-docs',
            swaggerUI.serve,
            swaggerUI.setup(swaggerDoc)
        );
    }

    private initializeMongoDB() {
        mongoose.connect(process.env.MONGO_URI || '');
    }

    public listen(): void {
        try {
            this.initializeMongoDB();
            console.log('Conencted to DB');
            this.express.listen(this.port, () => {
                console.log(`App listening on port ${this.port}`);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export default App;
