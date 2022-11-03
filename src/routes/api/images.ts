import express from 'express';
import { readdirSync } from 'fs';
import sharp from 'sharp';

const images = express.Router();

images.get('/', async (req, res) => {
    let filename = String(req.query.filename);
    let width = Number(req.query.width);
    let height = Number(req.query.height);

    const fileNames = readdirSync(`${__dirname}/images/resized`);

    let identifier = `${filename}${width}x${height}`;
    if (fileNames.includes(identifier + '.jpg')) {
        console.log('serving already resized file...');
    }

    let response = null;

    try {
        response = await sharp(`${__dirname}/images/full/${filename}.jpg`)
            .resize(width, height)
            .toFile(`${__dirname}/images/resized/${identifier}.jpg`);
    } catch (error) {
        console.error(error);
    }

    res.send(response);
});

export default images;
