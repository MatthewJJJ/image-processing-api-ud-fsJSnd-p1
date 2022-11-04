import processImage from '../../../routes/api/imageService';

describe('testing image service', () => {
    it('testing image service with valid input', async () => {
        const response = await processImage(
            'TestImage',
            200,
            200,
            'TestImage200x200'
        );
        expect(response).toEqual({
            format: 'jpeg',
            width: 200,
            height: 200,
            channels: 3,
            premultiplied: false,
            size: 3780,
        });
    });
});
