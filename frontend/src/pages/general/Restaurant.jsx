import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMenuForRestaurant, getReelsForRestaurant, getRestaurant } from '../../lib/marketData'
import { addToCart, cartCount } from '../../lib/cart'
import '../../App.css'

const Restaurant = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = getRestaurant(id)
  const menu = getMenuForRestaurant(restaurant.id)
  const restaurantReels = getReelsForRestaurant(restaurant.id)
  const [addedId, setAddedId] = useState('')
  const [activeTab, setActiveTab] = useState('Menu')

  const handleAdd = (item) => {
    addToCart(item, restaurant.id)
    setAddedId(item.id)
    window.setTimeout(() => setAddedId(''), 1500)
  }

  return <main className="restaurant-page"><header className="restaurant-topbar"><button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">←</button><button className="restaurant-cart" onClick={() => navigate('/cart')}>Bag <span>{cartCount()}</span></button></header><section className="restaurant-hero"><img src={restaurant.cover} alt="" /><div className="restaurant-hero__veil" /><div className="restaurant-hero__content"><span className="restaurant-status"><i /> {restaurant.status}</span><h1>{restaurant.name}</h1><p>{restaurant.story}</p><div className="restaurant-facts"><span>★ {restaurant.rating} <small>({restaurant.reviews})</small></span><span>⌁ {restaurant.eta}</span><span>{restaurant.price}</span></div></div></section><div className="restaurant-content"><div className="restaurant-meta"><span>{restaurant.cuisine}</span><span>{restaurant.location}</span><span>Delivery available</span></div><nav className="restaurant-tabs" aria-label="Restaurant sections">{['Menu', 'Reels', 'Reviews', 'About'].map((tab) => <button key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => setActiveTab(tab)}>{tab}{tab === 'Reels' && <em>{restaurantReels.length}</em>}</button>)}</nav>{activeTab === 'Menu' && <section className="menu-section"><div className="menu-heading"><div><span className="eyebrow">ORDER WHAT YOU SAW</span><h2>Good things, grouped.</h2></div><span>{menu.length} items</span></div>{['Small plates', 'From the tandoor', 'Mains', 'Ramen', 'Cakes', 'Club classics'].map((category) => { const items = menu.filter((item) => item.category === category); return items.length ? <div className="menu-group" key={category}><h3>{category}</h3>{items.map((item) => <article className="menu-item" key={item.id}><img src={item.image} alt="" /><div className="menu-item__info"><span className="menu-label">{item.label}</span><h4>{item.name}</h4><p>{item.description}</p><strong>₹{item.price}</strong></div><button className="add-item" onClick={() => handleAdd(item)}>{addedId === item.id ? '✓' : '+'}</button></article>)}</div> : null })}</section>}{activeTab === 'Reels' && <section className="restaurant-reels"><div className="menu-heading"><div><span className="eyebrow">FROM THE KITCHEN & THE TABLE</span><h2>See it before you taste it.</h2></div></div><div className="restaurant-reel-grid">{restaurantReels.map((reel) => <button key={reel.id} onClick={() => navigate(`/reels?reel=${reel.id}`)}><img src={reel.image} alt={reel.caption} /><span>{reel.source}</span><strong>{reel.caption}</strong></button>)}</div></section>}{activeTab === 'Reviews' && <section className="restaurant-reviews"><span className="eyebrow">VERIFIED DINERS</span><h2>“The food looked good<br />and tasted even better.”</h2><p>Reviews are linked to real orders so the next craving starts with confidence.</p><button className="text-link" onClick={() => navigate('/reels')}>Watch customer reels →</button></section>}{activeTab === 'About' && <section className="restaurant-about"><span className="eyebrow">THE SHORT STORY</span><h2>{restaurant.story}</h2><p>Open today for delivery and pickup. Follow the kitchen for fresh-batch drops, behind-the-scenes prep, and the dishes the neighbourhood is talking about.</p><div className="tag-list">{restaurant.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>}</div></main>
}

export default Restaurant
