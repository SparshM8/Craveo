export const demoBites = [
  {
    id: 'bite-1',
    restaurantId: 'naan-beyond',
    menuItemId: 'paneer-01',
    name: 'Crispy Chili Paneer',
    partner: 'Naan & Beyond',
    location: 'Indiranagar · 1.2 km',
    category: 'Spicy',
    price: '₹320 for two',
    rating: '4.8',
    time: '12 min ago',
    description: 'Smoky char, crunchy edges, and a hit of house chili oil.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
    accent: '#ff795c',
    saves: 128,
    likes: 412,
  },
  {
    id: 'bite-2',
    restaurantId: 'bun-maska-club',
    menuItemId: 'bun-01',
    name: 'The Butter Chicken Bun',
    partner: 'Bun Maska Club',
    location: 'Koramangala · 2.4 km',
    category: 'Must try',
    price: '₹240 for two',
    rating: '4.6',
    time: '38 min ago',
    description: 'A soft milk bun, slow-cooked chicken, and a little green chutney.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85',
    accent: '#f6bd4b',
    saves: 96,
    likes: 308,
  },
  {
    id: 'bite-3',
    restaurantId: 'hako-ramen',
    menuItemId: 'ramen-01',
    name: 'Midnight Miso Ramen',
    partner: 'Hako Ramen',
    location: 'HSR Layout · 3.1 km',
    category: 'Late night',
    price: '₹560 for two',
    rating: '4.9',
    time: '1 hr ago',
    description: 'Silky broth, springy noodles, and the best kind of rainy-day mood.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
    accent: '#9fd8d1',
    saves: 214,
    likes: 677,
  },
  {
    id: 'bite-4',
    restaurantId: 'melt-bakehouse',
    menuItemId: 'cake-01',
    name: 'Pistachio Tres Leches',
    partner: 'Melt Bakehouse',
    location: 'Richmond Town · 4.0 km',
    category: 'Sweet tooth',
    price: '₹420 for two',
    rating: '4.7',
    time: '2 hrs ago',
    description: 'Cold, creamy, and gone in three spoonfuls. No regrets.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85',
    accent: '#d4b3f4',
    saves: 154,
    likes: 529,
  },
  {
    id: 'bite-5',
    restaurantId: 'naan-beyond',
    menuItemId: 'thali-01',
    name: 'Sunday Thali, Reimagined',
    partner: 'The Local Thali',
    location: 'Jayanagar · 5.6 km',
    category: 'Comfort food',
    price: '₹680 for two',
    rating: '4.5',
    time: '3 hrs ago',
    description: 'Six little bowls of comfort, one very happy table.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    accent: '#b9de74',
    saves: 79,
    likes: 246,
  },
]

export const categories = ['For you', 'Spicy', 'Must try', 'Late night', 'Sweet tooth']

export function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem('craveo:saved') || '[]')
  } catch {
    return []
  }
}

export function toggleSaved(id) {
  const current = getSavedIds()
  const next = current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
  localStorage.setItem('craveo:saved', JSON.stringify(next))
  return next
}
