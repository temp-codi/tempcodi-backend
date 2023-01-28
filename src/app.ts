import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

class App {
    public express: Application;
    public port: number;

    constructor(controller: [], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeHome();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
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
            res.send('<h1>TEMPCODI API</h1>');
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
