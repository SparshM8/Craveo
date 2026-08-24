process.env.IMAGEKIT_PUBLIC_KEY = 'test-public-key';
process.env.IMAGEKIT_PRIVATE_KEY = 'test-private-key';
process.env.IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/test';

const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');
const foodModel = require('../models/food.model');
const foodPartnerModel = require('../models/foodpartner.model');
const storageService = require('../services/storage.service');
const jwt = require('jsonwebtoken');

test('POST /api/food parses the mama file field and persists the uploaded URL', async () => {
    const partnerId = '507f1f77bcf86cd799439011';
    const originalCreate = foodModel.create;
    const originalFindById = foodPartnerModel.findById;
    const originalUploadFile = storageService.uploadFile;
    process.env.JWT_SECRET = 'test-secret';

    foodPartnerModel.findById = async () => ({ _id: partnerId, name: 'Test Kitchen' });
    storageService.uploadFile = async (buffer, fileName) => {
        assert.equal(Buffer.isBuffer(buffer), true);
        assert.equal(buffer.toString(), 'fake-video-bytes');
        assert.ok(fileName);
        return { url: 'https://cdn.example.test/fake-video.mp4' };
    };
    foodModel.create = async (payload) => ({ _id: 'food-1', ...payload });

    try {
        const token = jwt.sign({ id: partnerId }, process.env.JWT_SECRET);
        const response = await request(app)
            .post('/api/food')
            .set('Cookie', [`token=${token}`])
            .field('name', 'Test Chili Bun')
            .field('description', 'A test upload')
            .attach('mama', Buffer.from('fake-video-bytes'), { filename: 'test-bite.mp4', contentType: 'video/mp4' });

        assert.equal(response.status, 201);
        assert.deepEqual(response.body.food, {
            _id: 'food-1',
            name: 'Test Chili Bun',
            description: 'A test upload',
            video: 'https://cdn.example.test/fake-video.mp4',
            foodPartner: partnerId
        });
    } finally {
        foodModel.create = originalCreate;
        foodPartnerModel.findById = originalFindById;
        storageService.uploadFile = originalUploadFile;
    }
});

test('POST /api/food rejects an upload without a video file before touching storage', async () => {
    const partnerId = '507f1f77bcf86cd799439011';
    const originalFindById = foodPartnerModel.findById;
    process.env.JWT_SECRET = 'test-secret';
    foodPartnerModel.findById = async () => ({ _id: partnerId, name: 'Test Kitchen' });

    try {
        const token = jwt.sign({ id: partnerId }, process.env.JWT_SECRET);
        const response = await request(app)
            .post('/api/food')
            .set('Cookie', [`token=${token}`])
            .field('name', 'Missing Video');

        assert.equal(response.status, 400);
        assert.equal(response.body.message, 'A food video is required');
    } finally {
        foodPartnerModel.findById = originalFindById;
    }
});
