import express from 'express';
import routes from './routes';

const port = 3000;
const app = express();

const middle = [
    (req: express.Request, res: express.Response, next: Function) => {
        const log = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log('INFO LOG:', log);
        next();
    },
];

app.get('/', (req, res) => {
    res.send(
        'Welcome to the Image Processing API...  Use /api route to access the functionality...'
    );
});

app.use('/api', middle, routes);

app.listen(port, () => {
    console.log(`Image Processing API started on port: ${port}...`);
    console.log(
        `Make a request to http://localhost:${port}/ to confirm it is working...`
    );
});
