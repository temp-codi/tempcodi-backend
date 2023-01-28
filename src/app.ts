import express, { Application } from 'express';

class App {
    public express: Application;
    public port: number;

    constructor(controller: [], port: number) {
        this.express = express();
        this.port = port;
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
