import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
    res.send('Retrieving image...');
});

export default images;
