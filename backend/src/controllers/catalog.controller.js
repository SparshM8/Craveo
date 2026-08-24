const Restaurant = require('../models/restaurant.model')

const listRestaurants = async (req, res) => {
  const { city = 'Lucknow', area, category, q, lat, lng, radius = 12000, limit = 40 } = req.query
  const filter = { city, status: { $in: ['open', 'paused'] } }
  if (area) filter.area = area
  if (category) filter.cuisines = { $regex: new RegExp(String(category), 'i') }
  if (q) filter.$or = [{ name: { $regex: String(q), $options: 'i' } }, { cuisines: { $regex: String(q), $options: 'i' } }, { area: { $regex: String(q), $options: 'i' } }]

  if (lat && lng) {
    filter.location = { $near: { $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] }, $maxDistance: Math.min(Number(radius) || 12000, 50000) } }
  }

  const restaurants = await Restaurant.find(filter).sort({ openNow: -1, 'ratings.craveo.rating': -1 }).limit(Math.min(Number(limit) || 40, 100)).lean()
  return res.json({ city, restaurants, source: 'craveo-canonical-catalog' })
}

const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] }).lean()
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' })
  return res.json({ restaurant, source: 'craveo-canonical-catalog' })
}

module.exports = { listRestaurants, getRestaurant }
