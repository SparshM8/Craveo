import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMenuItem, getReel, getRestaurant, reels } from '../../lib/marketData'
import { addToCart, cartCount } from '../../lib/cart'
import '../../App.css'

const Reels = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeId, setActiveId] = useState(searchParams.get('reel') || reels[0].id)
  const [added, setAdded] = useState('')
  const activeReel = getReel(activeId) || reels[0]
  const activeRestaurant = getRestaurant(activeReel.restaurantId)
  const activeItem = getMenuItem(activeReel.menuItemId)
  const orderedReels = useMemo(() => [activeReel, ...reels.filter((reel) => reel.id !== activeReel.id)], [activeReel])

  const handleAdd = () => {
    addToCart(activeItem, activeRestaurant.id)
    setAdded(activeItem.id)
    window.setTimeout(() => setAdded(''), 1800)
  }

  return <main className="reels-page">
    <header className="reels-topbar"><button className="reels-back" onClick={() => navigate('/')} aria-label="Back to discover">←</button><div className="reels-brand"><span className="logo-mark">C</span><span>craveo</span><small>VISUAL FOOD NETWORK</small></div><button className="reels-cart" onClick={() => navigate('/cart')} aria-label="Open cart">Bag <span>{cartCount()}</span></button></header>
    <div className="reels-layout"><section className="reels-stage" aria-label="Food reels"><div className="reel-card" style={{ '--reel-accent': activeReel.accent }}><img src={activeReel.image} alt={activeItem.name} className="reel-card__image" /><div className="reel-card__veil" /><div className="reel-card__top"><span className="reel-source">{activeReel.source}</span><span className="reel-duration">{activeReel.duration}</span></div><div className="reel-card__content"><div className="reel-card__creator"><span className="creator-avatar">{activeRestaurant.avatar}</span><span><strong>{activeReel.creator}</strong><small>{activeReel.creatorType} · {activeReel.views} views</small></span></div><h1>{activeReel.caption}</h1><p>{activeRestaurant.name} · {activeRestaurant.location}</p><div className="reel-card__actions"><button className="reel-order-button" onClick={handleAdd}>{added === activeItem.id ? 'Added to bag ✓' : `Order ${activeItem.name}`} <span>₹{activeItem.price} →</span></button><button className="reel-restaurant-button" onClick={() => navigate(`/restaurant/${activeRestaurant.id}`)}>View restaurant</button></div></div><div className="reel-card__side"><button aria-label="Like this reel">♡<small>2.4K</small></button><button aria-label="Save this reel">⌑<small>Save</small></button><button aria-label="Share this reel">↗<small>Share</small></button></div></div><div className="reel-progress"><span /><span className="is-active" /><span /><span /></div></section><aside className="reels-rail"><div className="reels-rail__heading"><span className="eyebrow">SCROLL TO TASTE</span><h2>For your next craving.</h2></div>{orderedReels.map((reel) => { const restaurant = getRestaurant(reel.restaurantId); const item = getMenuItem(reel.menuItemId); return <button className={`reel-thumb ${reel.id === activeReel.id ? 'is-active' : ''}`} key={reel.id} onClick={() => setActiveId(reel.id)}><img src={reel.image} alt="" /><span><strong>{item.name}</strong><small>{restaurant.name} · {reel.source}</small></span><i>→</i></button> })}<div className="reels-rail__note"><span>✳</span><p>Every bite is linked to a live menu. No mystery food, no dead ends.</p></div></aside></div>
  </main>
}

export default Reels
