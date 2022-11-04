import express from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import processImage from './imageService';

const images = express.Router();

images.get('/', async (req, res) => {
    let filename = req.query.filename ? String(req.query.filename) : null;
    let width = req.query.width ? Number(req.query.width) : null;
    let height = req.query.height ? Number(req.query.height) : null;

    let isValidInput = filename !== null && width !== null && height !== null;

    console.log(path.resolve(__dirname, '../../../images/resized'));
    const fileNames = readdirSync(
        path.resolve(__dirname, '../../../images/resized')
    );

    let identifier = `${filename}${width}x${height}`;
    if (!isValidInput) {
        res.send(
            'No parameters given.  Please include a filename, width, and height...'
        );
    } else if (fileNames.includes(identifier + '.jpg')) {
        console.log('Retrieving cached image...');
        res.sendFile(
            path.resolve(__dirname, `../../../images/resized/${identifier}.jpg`)
        );
    } else {
        let response = null;

        try {
            response = await processImage(
                filename as string,
                width as number,
                height as number,
                identifier
            );
        } catch (error) {
            console.error('ERROR LOG:', error);
            res.send(`An unexpected error occurred... \n ${error}`);
        }

        console.log('INFO LOG:', response);
        res.sendFile(
            path.resolve(__dirname, `../../../images/resized/${identifier}.jpg`)
        );
    }
});

export default images;
