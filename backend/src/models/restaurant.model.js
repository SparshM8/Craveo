const mongoose = require('mongoose')

const ratingSourceSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5 },
  count: { type: Number, min: 0, default: 0 },
  url: String,
  lastSyncedAt: Date,
}, { _id: false })

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  city: { type: String, required: true, default: 'Lucknow', index: true },
  area: { type: String, required: true, index: true },
  cuisines: { type: [String], default: [] },
  description: String,
  address: { type: String, required: true },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], required: true } },
  deliveryRadiusMeters: { type: Number, default: 8000 },
  openNow: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'open', 'paused', 'closed', 'suspended'], default: 'draft', index: true },
  priceBand: { type: String, enum: ['₹', '₹₹', '₹₹₹', '₹₹₹₹'], default: '₹₹' },
  etaMinutes: { min: Number, max: Number },
  coverImageUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'foodpartner' },
  providerRefs: {
    googlePlaceId: String,
    zomatoRestaurantId: String,
    swiggyRestaurantId: String,
    toingRestaurantId: String,
  },
  ratings: {
    google: ratingSourceSchema,
    zomato: ratingSourceSchema,
    swiggy: ratingSourceSchema,
    craveo: ratingSourceSchema,
  },
}, { timestamps: true })

restaurantSchema.index({ location: '2dsphere' })
restaurantSchema.index({ city: 1, area: 1, status: 1 })

module.exports = mongoose.model('restaurant', restaurantSchema)
