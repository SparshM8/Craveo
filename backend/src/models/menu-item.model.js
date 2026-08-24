const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant', required: true, index: true },
  name: { type: String, required: true, trim: true },
  description: String,
  category: { type: String, default: 'Popular' },
  priceMinor: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  imageUrl: String,
  available: { type: Boolean, default: true, index: true },
  vegetarian: Boolean,
  spiceLevel: { type: Number, min: 0, max: 5 },
  providerRefs: {
    zomatoItemId: String,
    swiggyItemId: String,
    toingItemId: String,
  },
  lastSyncedAt: Date,
}, { timestamps: true })

menuItemSchema.index({ restaurant: 1, available: 1, category: 1 })

module.exports = mongoose.model('menuitem', menuItemSchema)
