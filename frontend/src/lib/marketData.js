export const restaurants = [
  {
    id: 'naan-beyond',
    name: 'Naan & Beyond',
    cuisine: 'Modern Indian',
    location: 'Indiranagar, Bengaluru',
    rating: '4.8',
    reviews: 486,
    eta: '28–35 min',
    price: '₹₹',
    isOpen: true,
    status: 'Open now',
    cover: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85',
    avatar: 'NB',
    accent: '#ff795c',
    story: 'Regional Indian flavours, plated with a little more drama.',
    tags: ['North Indian', 'Vegetarian friendly', 'Popular nearby'],
  },
  {
    id: 'hako-ramen',
    name: 'Hako Ramen',
    cuisine: 'Japanese',
    location: 'HSR Layout, Bengaluru',
    rating: '4.9',
    reviews: 712,
    eta: '32–40 min',
    price: '₹₹₹',
    isOpen: true,
    status: 'Open now',
    cover: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1600&q=85',
    avatar: 'HR',
    accent: '#9fd8d1',
    story: 'Slow broth, springy noodles, and no shortcuts.',
    tags: ['Ramen', 'Late night', 'Chef-led'],
  },
  {
    id: 'melt-bakehouse',
    name: 'Melt Bakehouse',
    cuisine: 'Bakery & Desserts',
    location: 'Richmond Town, Bengaluru',
    rating: '4.7',
    reviews: 328,
    eta: '20–28 min',
    price: '₹₹',
    isOpen: true,
    status: 'Fresh batches now',
    cover: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=85',
    avatar: 'MB',
    accent: '#d4b3f4',
    story: 'Small-batch bakes for very serious sweet tooth energy.',
    tags: ['Desserts', 'Freshly baked', 'Vegetarian'],
  },
  {
    id: 'bun-maska-club',
    name: 'Bun Maska Club',
    cuisine: 'Cafe & Comfort Food',
    location: 'Koramangala, Bengaluru',
    rating: '4.6',
    reviews: 241,
    eta: '24–32 min',
    price: '₹₹',
    isOpen: true,
    status: 'Open now',
    cover: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85',
    avatar: 'BM',
    accent: '#f6bd4b',
    story: 'The corner cafe you wish was around every corner.',
    tags: ['Cafe', 'All-day breakfast', 'Comfort food'],
  },
]

export const menuItems = [
  { id: 'paneer-01', restaurantId: 'naan-beyond', name: 'Crispy Chili Paneer', description: 'Smoky char, crunchy edges, and a hit of house chili oil.', price: 320, label: 'Most watched', category: 'Small plates', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', vegetarian: true, spice: 3 },
  { id: 'naan-01', restaurantId: 'naan-beyond', name: 'Garlic Butter Naan', description: 'Tandoor-blistered naan with garlic, butter, and coriander.', price: 150, label: 'Crowd favourite', category: 'From the tandoor', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', vegetarian: true, spice: 1 },
  { id: 'thali-01', restaurantId: 'naan-beyond', name: 'Sunday Thali, Reimagined', description: 'Six little bowls of comfort, one very happy table.', price: 680, label: 'New this week', category: 'Mains', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', vegetarian: true, spice: 2 },
  { id: 'ramen-01', restaurantId: 'hako-ramen', name: 'Midnight Miso Ramen', description: 'Silky broth, springy noodles, and the best rainy-day mood.', price: 560, label: 'Late-night icon', category: 'Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85', vegetarian: false, spice: 2 },
  { id: 'gyoza-01', restaurantId: 'hako-ramen', name: 'Yuzu Chicken Gyoza', description: 'Crisp bottoms, juicy filling, and a bright yuzu dip.', price: 340, label: 'Popular', category: 'Small plates', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85', vegetarian: false, spice: 1 },
  { id: 'cake-01', restaurantId: 'melt-bakehouse', name: 'Pistachio Tres Leches', description: 'Cold, creamy, and gone in three spoonfuls. No regrets.', price: 420, label: 'Internet favourite', category: 'Cakes', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', vegetarian: true, spice: 0 },
  { id: 'bun-01', restaurantId: 'bun-maska-club', name: 'The Butter Chicken Bun', description: 'A soft milk bun, slow-cooked chicken, and green chutney.', price: 240, label: 'Most reordered', category: 'Club classics', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85', vegetarian: false, spice: 1 },
]

export const reels = [
  { id: 'reel-01', restaurantId: 'naan-beyond', menuItemId: 'paneer-01', creator: 'Naan & Beyond', creatorType: 'Restaurant', source: 'Restaurant', caption: 'The crackle before the first bite.', duration: '0:18', views: '18.4K', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90', accent: '#ff795c' },
  { id: 'reel-02', restaurantId: 'hako-ramen', menuItemId: 'ramen-01', creator: 'Maya eats Bengaluru', creatorType: 'Customer', source: 'Verified order', caption: 'Rain outside. Miso inside.', duration: '0:23', views: '9.8K', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=90', accent: '#9fd8d1' },
  { id: 'reel-03', restaurantId: 'melt-bakehouse', menuItemId: 'cake-01', creator: 'Melt Bakehouse', creatorType: 'Restaurant', source: 'Fresh batch', caption: 'A little milk, a lot of pistachio.', duration: '0:15', views: '14.1K', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=90', accent: '#d4b3f4' },
  { id: 'reel-04', restaurantId: 'bun-maska-club', menuItemId: 'bun-01', creator: 'Arjun’s lunch break', creatorType: 'Customer', source: 'Verified order', caption: 'The bun that fixed my Monday.', duration: '0:20', views: '7.2K', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90', accent: '#f6bd4b' },
]

export const getRestaurant = (id) => restaurants.find((restaurant) => restaurant.id === id) || restaurants[0]
export const getMenuForRestaurant = (id) => menuItems.filter((item) => item.restaurantId === id)
export const getReelsForRestaurant = (id) => reels.filter((reel) => reel.restaurantId === id)
export const getMenuItem = (id) => menuItems.find((item) => item.id === id)
export const getReel = (id) => reels.find((reel) => reel.id === id)
