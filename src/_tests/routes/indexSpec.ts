import supertest from 'supertest';
import app from '../../index';

const mockApp = supertest(app);

describe('testing base api endpoints', () => {
    it('testing api welcome endpoint for message', async () => {
        const response = await mockApp.get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Image Processing API starting endpoint...');
    });
});
