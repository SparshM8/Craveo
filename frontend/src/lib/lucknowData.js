export const lucknowAreas = [
  { id: 'gomti-nagar', name: 'Gomti Nagar', mood: 'new Lucknow energy', count: 24 },
  { id: 'hazratganj', name: 'Hazratganj', mood: 'old-school charm', count: 18 },
  { id: 'aminabad', name: 'Aminabad', mood: 'street-food theatre', count: 31 },
  { id: 'chowk', name: 'Chowk', mood: 'Awadhi soul', count: 27 },
  { id: 'indira-nagar', name: 'Indira Nagar', mood: 'everyday favourites', count: 22 },
  { id: 'aliganj', name: 'Aliganj', mood: 'cafés and comfort', count: 16 },
  { id: 'charbagh', name: 'Charbagh', mood: 'always moving', count: 13 },
  { id: 'ashiyana', name: 'Ashiyana', mood: 'family tables', count: 15 },
]

export const lucknowCategories = ['All food', 'Awadhi', 'Kebabs', 'Biryani', 'Chaat', 'Cafés', 'Desserts', 'Late night', 'Vegetarian']

export const lucknowRestaurants = [
  { id: 'lk-001', name: 'Awadh Smoke House', area: 'gomti-nagar', areaLabel: 'Gomti Nagar', cuisine: 'Awadhi · Kebabs', category: 'Awadhi', rating: '4.7', reviewCount: 1840, eta: '25–35 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85', color: '#ff795c', open: true, featured: 'The seekh kebab reel everyone is saving', orderMode: 'Restaurant direct', sources: { google: '4.6', zomato: '4.5', swiggy: '4.7', craveo: '4.9' } },
  { id: 'lk-002', name: 'Dastarkhwan 2.0', area: 'hazratganj', areaLabel: 'Hazratganj', cuisine: 'Mughlai · Biryani', category: 'Biryani', rating: '4.6', reviewCount: 2310, eta: '30–40 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=1000&q=85', color: '#f6bd4b', open: true, featured: 'Dum lifted, steam caught on camera', orderMode: 'Partner handoff', sources: { google: '4.5', zomato: '4.4', swiggy: '4.6', craveo: '4.8' } },
  { id: 'lk-003', name: 'Aminabad Chaat Co.', area: 'aminabad', areaLabel: 'Aminabad', cuisine: 'Chaat · Street food', category: 'Chaat', rating: '4.8', reviewCount: 968, eta: '20–30 min', price: '₹', cover: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85', color: '#d4b3f4', open: true, featured: 'Crunch, chutney, repeat', orderMode: 'Test checkout', sources: { google: '4.7', zomato: '4.6', swiggy: '4.8', craveo: '4.9' } },
  { id: 'lk-004', name: 'Chowk Kebab Lab', area: 'chowk', areaLabel: 'Chowk', cuisine: 'Kebabs · North Indian', category: 'Kebabs', rating: '4.9', reviewCount: 1420, eta: '35–45 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85', color: '#9fd8d1', open: true, featured: 'A smoky plate with a family recipe', orderMode: 'Restaurant direct', sources: { google: '4.8', zomato: '4.7', swiggy: '4.8', craveo: '4.9' } },
  { id: 'lk-005', name: 'Ganj & Grain', area: 'hazratganj', areaLabel: 'Hazratganj', cuisine: 'Café · Breakfast', category: 'Cafés', rating: '4.5', reviewCount: 642, eta: '18–28 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85', color: '#b9de74', featured: 'A slow breakfast in a fast city', orderMode: 'Restaurant direct', sources: { google: '4.4', zomato: '4.3', swiggy: '4.5', craveo: '4.7' } },
  { id: 'lk-006', name: 'Malai & Co.', area: 'indira-nagar', areaLabel: 'Indira Nagar', cuisine: 'Desserts · Bakery', category: 'Desserts', rating: '4.7', reviewCount: 537, eta: '22–30 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85', color: '#f6bd4b', open: true, featured: 'The midnight kulfi drop', orderMode: 'Partner handoff', sources: { google: '4.6', zomato: '4.5', swiggy: '4.6', craveo: '4.8' } },
  { id: 'lk-007', name: 'The Veg Table', area: 'aliganj', areaLabel: 'Aliganj', cuisine: 'Vegetarian · North Indian', category: 'Vegetarian', rating: '4.6', reviewCount: 391, eta: '25–35 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85', color: '#9fd8d1', featured: 'Colour on a plate, no compromise', orderMode: 'Test checkout', sources: { google: '4.5', zomato: '4.4', swiggy: '4.5', craveo: '4.8' } },
  { id: 'lk-008', name: 'Night Shift Bites', area: 'gomti-nagar', areaLabel: 'Gomti Nagar', cuisine: 'Late night · Comfort food', category: 'Late night', rating: '4.4', reviewCount: 722, eta: '30–40 min', price: '₹₹', cover: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85', color: '#d4b3f4', open: true, featured: 'For the craving after midnight', orderMode: 'Restaurant direct', sources: { google: '4.4', zomato: '4.2', swiggy: '4.4', craveo: '4.7' } },
]

export const sourceLabels = { google: 'Google Maps', zomato: 'Zomato', swiggy: 'Swiggy', craveo: 'Craveo diners' }
export const getLucknowRestaurant = (id) => lucknowRestaurants.find((restaurant) => restaurant.id === id) || lucknowRestaurants[0]
