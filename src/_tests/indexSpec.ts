import supertest from 'supertest';
import app from '../index';

const mockApp = supertest(app);

describe('testing base endpoints', () => {
    it('testing main endpoint for welcome message', async () => {
        const response = await mockApp.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe(
            'Welcome to the Image Processing API...  Use /api route to access the functionality...'
        );
    });
});
