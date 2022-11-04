import path from 'path';
import sharp from 'sharp';

const processImage = async (
    filename: string,
    width: number,
    height: number,
    id: string
) => {
    let response = await sharp(
        path.resolve(__dirname, `../../../images/full/${filename}.jpg`)
    )
        .resize(width, height)
        .toFile(path.resolve(__dirname, `../../../images/resized/${id}.jpg`));
    return response;
};

export default processImage;
