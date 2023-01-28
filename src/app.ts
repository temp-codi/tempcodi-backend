import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

class App {
    public express: Application;
    public port: number;

    constructor(controller: [], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeHome(): void {}

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
