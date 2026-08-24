const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');
const reviewModel = require('../models/reviews.model');
const { v4: uuid } = require('uuid');

const normalizeFood = (food, partner) => ({
    ...food.toObject(),
    foodPartner: partner || food.foodPartner,
    foodPartnerName: partner?.name || food.foodPartner?.name || 'Local food maker'
});

async function createFood(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'A food video is required' });
    }

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({ message: 'food created successfully', food: foodItem });
}

async function getFoodItems(req, res) {
    const [foodItems, likes, saves] = await Promise.all([
        foodModel.find({}).populate('foodPartner', 'name address'),
        likeModel.find({ user: req.user._id }).select('food'),
        saveModel.find({ user: req.user._id }).select('food')
    ]);
    const likedIds = new Set(likes.map((like) => like.food.toString()));
    const savedIds = new Set(saves.map((save) => save.food.toString()));

    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems: foodItems.map((food) => ({
            ...normalizeFood(food),
            isLiked: likedIds.has(food._id.toString()),
            isSaved: savedIds.has(food._id.toString())
        }))
    });
}

async function getFoodById(req, res) {
    const food = await foodModel.findById(req.params.foodId).populate('foodPartner', 'name address phone');
    if (!food) return res.status(404).json({ message: 'Food bite not found' });

    const [reviews, userReview] = await Promise.all([
        reviewModel.find({ food: food._id }).populate('user', 'fullName').sort({ createdAt: -1 }),
        reviewModel.findOne({ food: food._id, user: req.user._id })
    ]);
    const averageRating = reviews.length ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)) : null;

    res.status(200).json({
        food: normalizeFood(food),
        reviews,
        reviewCount: reviews.length,
        averageRating,
        userReview
    });
}

async function getFoodReviews(req, res) {
    const reviews = await reviewModel.find({ food: req.params.foodId }).populate('user', 'fullName').sort({ createdAt: -1 });
    res.status(200).json({ reviews, reviewCount: reviews.length });
}

async function createReview(req, res) {
    const { rating, comment } = req.body;
    const parsedRating = Number(rating);
    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ message: 'Rating must be a whole number from 1 to 5' });
    }
    if (typeof comment !== 'string' || comment.trim().length < 3 || comment.trim().length > 500) {
        return res.status(400).json({ message: 'Review must be between 3 and 500 characters' });
    }
    const food = await foodModel.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food bite not found' });

    const review = await reviewModel.findOneAndUpdate(
        { food: food._id, user: req.user._id },
        { rating: parsedRating, comment: comment.trim() },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate('user', 'fullName');

    res.status(201).json({ message: 'Review saved successfully', review });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;
    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });
    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food bite not found' });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({ user: user._id, food: foodId });
        food.likeCount = Math.max(0, food.likeCount - 1);
        await food.save();
        return res.status(200).json({ message: 'Food unliked successfully', like: false, foodId, likeCount: food.likeCount });
    }

    await likeModel.create({ user: user._id, food: foodId });
    food.likeCount += 1;
    await food.save();
    res.status(201).json({ message: 'Food liked successfully', like: true, foodId, likeCount: food.likeCount });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;
    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });
    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food bite not found' });

    if (isAlreadySaved) {
        await saveModel.deleteOne({ user: user._id, food: foodId });
        food.savesCount = Math.max(0, food.savesCount - 1);
        await food.save();
        return res.status(200).json({ message: 'Food unsaved successfully', save: false, foodId, savesCount: food.savesCount });
    }

    await saveModel.create({ user: user._id, food: foodId });
    food.savesCount += 1;
    await food.save();
    res.status(201).json({ message: 'Food saved successfully', save: true, foodId, savesCount: food.savesCount });
}

async function getSaveFood(req, res) {
    const savedFoods = await saveModel.find({ user: req.user._id }).populate({ path: 'food', populate: { path: 'foodPartner', select: 'name address' } });
    res.status(200).json({
        message: 'Saved foods retrieved successfully',
        savedFoods: savedFoods.map((saved) => ({ ...saved.toObject(), food: normalizeFood(saved.food) }))
    });
}

module.exports = {
    createFood,
    getFoodItems,
    getFoodById,
    getFoodReviews,
    createReview,
    likeFood,
    saveFood,
    getSaveFood
};
