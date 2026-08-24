import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../lib/cart'
import { getRestaurant } from '../../lib/marketData'
import '../../App.css'

const steps = ['Confirmed', 'Preparing', 'On the way', 'Delivered']

const Orders = () => {
  const navigate = useNavigate()
  const [orders] = useState(getOrders())
  return <main className="orders-page"><header className="simple-page-header"><button className="back-button" onClick={() => navigate('/')} aria-label="Back to home">←</button><div><span className="eyebrow">YOUR TABLE, REMOTE</span><h1>Orders</h1></div><span className="header-count">{orders.length.toString().padStart(2, '0')}</span></header>{orders.length ? <section className="orders-list">{orders.map((order) => { const restaurant = getRestaurant(order.restaurantId); const activeStep = order.status === 'delivered' ? 3 : 1; return <article className="order-card" key={order.id}><div className="order-card__top"><div><span className="eyebrow">ORDER {order.id}</span><h2>{order.restaurantName}</h2><p>{new Date(order.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p></div><span className="order-status"><i /> {steps[activeStep]}</span></div><div className="order-progress">{steps.map((step, index) => <div className={index <= activeStep ? 'is-done' : ''} key={step}><span>{index < activeStep ? '✓' : index + 1}</span><small>{step}</small></div>)}</div><div className="order-card__bottom"><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items · ₹{order.total}</span><strong>Arriving in {order.eta}</strong><button onClick={() => navigate(`/restaurant/${restaurant.id}`)}>Order again →</button></div></article> })}</section> : <div className="orders-empty"><div className="orders-empty__stamp">✳</div><span className="eyebrow">YOUR NEXT STORY</span><h2>No orders yet.<br /><em>That can change.</em></h2><p>Start with a reel, find a bite, and make tonight more interesting.</p><button className="primary-button" onClick={() => navigate('/reels')}>Start craving <span>→</span></button></div>}</main>
}

export default Orders
