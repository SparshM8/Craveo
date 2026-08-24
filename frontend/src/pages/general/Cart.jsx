import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartSubtotal, createLocalOrder, getCart, updateCartItem } from '../../lib/cart'
import { getRestaurant } from '../../lib/marketData'
import '../../App.css'

const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(getCart())
  const restaurant = getRestaurant(cart.restaurantId)
  const [address, setAddress] = useState('12, 5th Main · Indiranagar')
  const [mode, setMode] = useState('delivery')
  const subtotal = cartSubtotal(cart)
  const delivery = subtotal ? 40 : 0
  const taxes = subtotal ? Math.round(subtotal * 0.05) : 0
  const total = subtotal + delivery + taxes

  useEffect(() => { const onStorage = () => setCart(getCart()); window.addEventListener('storage', onStorage); return () => window.removeEventListener('storage', onStorage) }, [])
  const itemCount = useMemo(() => cart.items.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const update = (itemId, quantity) => setCart(updateCartItem(itemId, quantity))
  const placeOrder = () => { if (!cart.items.length) return; createLocalOrder(cart, restaurant); navigate('/orders') }

  return <main className="cart-page"><header className="simple-page-header"><button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">←</button><div><span className="eyebrow">YOUR ORDER</span><h1>Checkout</h1></div><span className="header-count">{itemCount.toString().padStart(2, '0')}</span></header>{cart.items.length ? <div className="checkout-layout"><section><div className="checkout-restaurant"><span className="restaurant-avatar">{restaurant.avatar}</span><div><strong>{restaurant.name}</strong><p>{restaurant.eta} · {restaurant.location}</p></div><span className="open-dot">Open</span></div><div className="checkout-block"><div className="checkout-block__heading"><span className="eyebrow">YOUR BITES</span><button onClick={() => navigate(`/restaurant/${restaurant.id}`)}>Add more +</button></div>{cart.items.map((item) => <div className="cart-item" key={item.itemId}><img src={item.image} alt="" /><div><h3>{item.name}</h3><strong>₹{item.price}</strong></div><div className="quantity-control"><button onClick={() => update(item.itemId, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => update(item.itemId, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button></div></div>)}</div><div className="checkout-block"><div className="checkout-block__heading"><span className="eyebrow">GET IT HOW?</span></div><div className="mode-toggle"><button className={mode === 'delivery' ? 'is-active' : ''} onClick={() => setMode('delivery')}><strong>Delivery</strong><small>At your door · {restaurant.eta}</small></button><button className={mode === 'pickup' ? 'is-active' : ''} onClick={() => setMode('pickup')}><strong>Pickup</strong><small>Ready in 18–24 min</small></button></div>{mode === 'delivery' && <label className="address-field"><span>DROP-OFF ADDRESS</span><input value={address} onChange={(event) => setAddress(event.target.value)} /></label>}</div></section><aside className="bill-card"><span className="eyebrow">ORDER SUMMARY</span><h2>One very good<br /><em>decision.</em></h2><div className="bill-lines"><span>Item total <strong>₹{subtotal}</strong></span><span>Delivery fee <strong>₹{delivery}</strong></span><span>Taxes & fees <strong>₹{taxes}</strong></span></div><div className="bill-total"><span>Total to pay</span><strong>₹{total}</strong></div><button className="primary-button checkout-button" onClick={placeOrder}>Place order <span>→</span></button><small className="secure-note">Secure checkout · No payment details stored in preview</small></aside></div> : <div className="cart-empty"><div className="cart-empty__number">00</div><span className="eyebrow">NOTHING IN THE BAG</span><h2>Your next order<br /><em>starts with a craving.</em></h2><p>Find something worth adding from the visual food network.</p><button className="primary-button" onClick={() => navigate('/reels')}>Discover bites <span>→</span></button></div>}</main>
}

export default Cart
