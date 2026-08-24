const CART_KEY = 'craveo:cart'
const ORDER_KEY = 'craveo:orders'

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || 'null') || { restaurantId: null, items: [] } } catch { return { restaurantId: null, items: [] } }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return cart
}

export function addToCart(item, restaurantId) {
  const current = getCart()
  const base = current.restaurantId && current.restaurantId !== restaurantId ? { restaurantId, items: [] } : { ...current, restaurantId }
  const existing = base.items.find((cartItem) => cartItem.itemId === item.id)
  const items = existing ? base.items.map((cartItem) => cartItem.itemId === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem) : [...base.items, { itemId: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }]
  return saveCart({ ...base, items })
}

export function updateCartItem(itemId, quantity) {
  const current = getCart()
  const items = quantity <= 0 ? current.items.filter((item) => item.itemId !== itemId) : current.items.map((item) => item.itemId === itemId ? { ...item, quantity } : item)
  return saveCart({ ...current, items, restaurantId: items.length ? current.restaurantId : null })
}

export function clearCart() { return saveCart({ restaurantId: null, items: [] }) }
export function cartCount(cart = getCart()) { return cart.items.reduce((sum, item) => sum + item.quantity, 0) }
export function cartSubtotal(cart = getCart()) { return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) }
export function getOrders() { try { return JSON.parse(localStorage.getItem(ORDER_KEY) || '[]') } catch { return [] } }
export function createLocalOrder(cart, restaurant) {
  const order = { id: `CRV-${Date.now().toString().slice(-6)}`, restaurantId: restaurant.id, restaurantName: restaurant.name, items: cart.items, total: cartSubtotal(cart) + 40, status: 'confirmed', createdAt: new Date().toISOString(), eta: restaurant.eta }
  localStorage.setItem(ORDER_KEY, JSON.stringify([order, ...getOrders()]))
  clearCart()
  return order
}
