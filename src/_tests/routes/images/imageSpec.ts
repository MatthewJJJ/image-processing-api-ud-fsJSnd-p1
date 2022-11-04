import supertest from 'supertest';
import app from '../../../index';
import { readdirSync, unlink } from 'fs';
import path from 'path';

const mockApp = supertest(app);

describe('testing image endpoint', () => {
    it('testing image api with basic params', async () => {
        const response = await mockApp.get(
            '/api/images?filename=TestImage&width=200&height=200'
        );

        const fileNames = readdirSync(
            path.resolve(__dirname, '../../../../images/resized')
        );

        expect(response.status).toBe(200);
        expect(fileNames.includes('TestImage200x200.jpg')).toBe(true);
    });

    it('testing image api with basic params', async () => {
        const response = await mockApp.get(
            '/api/images?filename=TestImage&width=200&height=400'
        );

        const fileNames = readdirSync(
            path.resolve(__dirname, '../../../../images/resized')
        );

        expect(response.status).toBe(200);
        expect(fileNames.includes('TestImage200x400.jpg')).toBe(true);
    });

    afterAll(() => {
        unlink(
            path.resolve(
                __dirname,
                '../../../../images/resized/TestImage200x200.jpg'
            ),
            () => {}
        );
        unlink(
            path.resolve(
                __dirname,
                '../../../../images/resized/TestImage200x400.jpg'
            ),
            () => {}
        );
    });
});
