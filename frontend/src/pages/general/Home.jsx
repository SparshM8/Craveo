import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import { addToCart } from '../../lib/cart'
import { categories, demoBites, getSavedIds, toggleSaved } from '../../lib/demoData'
import '../../App.css'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    flame: <path d="M12 21c4 0 7-2.5 7-6.3 0-2.9-1.7-5.5-4.3-7.4.2 2.5-1.1 3.8-2.1 4.4.3-3.7-1.3-6.3-3.6-8.2.2 3.8-3 5.7-3 9.3C6 18 8.7 21 12 21Z" />,
    pin: <><path d="M19 10.5c0 5.2-7 10-7 10s-7-4.8-7-10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10.5" r="2.3" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const Logo = () => <div className="logo-lockup" aria-label="Craveo"><span className="logo-mark">C</span><span className="logo-name">craveo</span></div>

const mapFood = (item) => {
  const partner = item.foodPartner && typeof item.foodPartner === 'object' ? item.foodPartner : null
  return {
    ...item,
    id: item._id || item.id,
    partner: item.foodPartnerName || partner?.name || item.partner || 'Craveo food maker',
    location: partner?.address || item.location || 'Near you',
    category: item.category || 'Fresh find',
    price: item.price || 'Ask for today’s price',
    rating: item.rating || 'New',
    image: item.image || null,
    video: item.video || null,
    isSaved: Boolean(item.isSaved),
    isLiked: Boolean(item.isLiked),
    likes: item.likeCount ?? item.likes ?? 0,
    saves: item.savesCount ?? item.saves ?? 0,
    reviews: item.reviews || [],
  }
}

const Media = ({ bite, className = '' }) => bite.image ? <img src={bite.image} alt={bite.name} className={className} /> : bite.video ? <video src={bite.video} className={className} muted loop autoPlay playsInline preload="metadata" /> : <div className={`${className} media-fallback`} aria-label="Food preview" />

const BiteCard = ({ bite, saved, onSave, onLike, onOpen }) => (
  <article className="bite-card" onClick={() => onOpen(bite)} onKeyDown={(event) => { if (event.key === 'Enter') onOpen(bite) }} tabIndex="0" style={{ '--card-accent': bite.accent }}>
    <div className="bite-card__image-wrap">
      <Media bite={bite} className="bite-card__image" />
      <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={(event) => { event.stopPropagation(); onSave(bite) }} aria-label={saved ? `Remove ${bite.name} from saved` : `Save ${bite.name}`}><Icon name="bookmark" size={18} /></button>
      <span className="bite-card__category">{bite.category}</span>
      <button className={`like-button ${bite.isLiked ? 'is-liked' : ''}`} onClick={(event) => { event.stopPropagation(); onLike(bite) }} aria-label={bite.isLiked ? `Unlike ${bite.name}` : `Like ${bite.name}`}><Icon name="heart" size={14} /> {bite.likes || 0}</button>
    </div>
    <div className="bite-card__body">
      <div className="bite-card__heading"><div><h3>{bite.name}</h3><p>{bite.partner}</p></div><span className="rating"><span>★</span> {bite.rating}</span></div>
      <p className="bite-card__description">{bite.description || 'A new bite worth making room for.'}</p>
      <div className="bite-card__meta"><span><Icon name="pin" size={13} /> {bite.location}</span><strong>{bite.price}</strong></div>
    </div>
  </article>
)

const RatingStars = ({ value, onChange }) => <div className="rating-picker" aria-label="Choose a rating">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" className={star <= value ? 'is-selected' : ''} onClick={() => onChange(star)} aria-label={`${star} star${star > 1 ? 's' : ''}`}><Icon name="star" size={22} /></button>)}</div>

const BiteModal = ({ bite, onClose, isLive, onReviewSaved, onAddToCart, onViewRestaurant }) => {
  const [rating, setRating] = useState(bite.userReview?.rating || 0)
  const [comment, setComment] = useState(bite.userReview?.comment || '')
  const [reviews, setReviews] = useState(bite.reviews || [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const submitReview = async (event) => {
    event.preventDefault()
    if (!rating || comment.trim().length < 3) { setError('Choose a rating and write at least 3 characters.'); return }
    setSaving(true); setError('')
    try {
      if (isLive) {
        const response = await api.post(`/api/food/${bite.id}/reviews`, { rating, comment })
        const nextReview = response.data.review
        setReviews((current) => [nextReview, ...current.filter((review) => review._id !== nextReview._id)])
        onReviewSaved({ ...bite, userReview: nextReview, reviews: [nextReview, ...reviews.filter((review) => review._id !== nextReview._id)] })
      } else {
        const localReview = { _id: `local-${Date.now()}`, rating, comment: comment.trim(), user: { fullName: 'You' }, createdAt: new Date().toISOString() }
        setReviews((current) => [localReview, ...current])
        onReviewSaved({ ...bite, userReview: localReview, reviews: [localReview, ...reviews] })
      }
      setComment('')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not save your review. Please try again.')
    } finally { setSaving(false) }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="bite-modal" role="dialog" aria-modal="true" aria-labelledby="bite-modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close bite details"><Icon name="close" size={21} /></button>
      <div className="bite-modal__media"><Media bite={bite} className="bite-modal__image" /><span className="bite-card__category">{bite.category}</span></div>
      <div className="bite-modal__content">
        <div className="bite-modal__eyebrow"><span className="eyebrow">BITE DETAILS</span><span className="rating"><span>★</span> {bite.rating}</span></div>
        <h2 id="bite-modal-title">{bite.name}</h2><p className="modal-partner">{bite.partner} <span>·</span> {bite.location}</p><p className="bite-modal__description">{bite.description || 'A new bite worth making room for.'}</p>
        <div className="modal-stats"><span>{bite.price}</span><span>{bite.likes || 0} likes</span><span>{reviews.length} reviews</span></div>
        <div className="modal-actions"><button className="primary-button" onClick={() => onAddToCart(bite)}>Add this bite <span>→</span></button><button className="secondary-button" onClick={() => onViewRestaurant(bite)}>View restaurant</button></div>
        <div className="reviews-section"><div className="reviews-heading"><h3>What people are saying</h3><span>{reviews.length ? `${reviews.length} notes` : 'Be first to leave a note'}</span></div>{reviews.length ? <div className="review-list">{reviews.slice(0, 3).map((review) => <div className="review-item" key={review._id}><div className="review-item__top"><strong>{review.user?.fullName || 'Craveo diner'}</strong><span>{'★'.repeat(review.rating)}</span></div><p>{review.comment}</p></div>)}</div> : <p className="review-empty">Good food deserves a little commentary.</p>}</div>
        <form className="review-form" onSubmit={submitReview}><div className="review-form__heading"><h3>{bite.userReview ? 'Update your note' : 'Leave a note'}</h3><RatingStars value={rating} onChange={setRating} /></div><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="What did you think?" maxLength={500} rows={3} />{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save review'} <span>→</span></button></form>
      </div>
    </section>
  </div>
}

const Home = () => {
  const navigate = useNavigate()
  const [bites, setBites] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [activeCategory, setActiveCategory] = useState('For you')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedBite, setSelectedBite] = useState(null)
  const [isLive, setIsLive] = useState(false)
  const [authNotice, setAuthNotice] = useState('')

  useEffect(() => {
    let active = true
    api.get('/api/food').then(({ data }) => {
      if (!active) return
      const nextBites = (data.foodItems || []).map(mapFood)
      setBites(nextBites)
      setSavedIds(nextBites.filter((bite) => bite.isSaved).map((bite) => bite.id))
      setIsLive(true)
    }).catch((error) => {
      if (!active) return
      setBites(demoBites)
      setSavedIds(getSavedIds())
      setAuthNotice(error.response?.status === 401 ? 'Sign in to see your saved bites and connect with the Craveo community.' : 'Preview mode is on while the Craveo API is unavailable.')
    })
    return () => { active = false }
  }, [])

  const filteredBites = useMemo(() => bites.filter((bite) => {
    const matchesCategory = activeCategory === 'For you' || bite.category === activeCategory
    const normalizedQuery = query.trim().toLowerCase()
    return matchesCategory && (!normalizedQuery || `${bite.name} ${bite.partner} ${bite.category}`.toLowerCase().includes(normalizedQuery))
  }), [activeCategory, bites, query])

  const handleLike = async (bite) => {
    if (!isLive) return
    setBites((current) => current.map((item) => item.id === bite.id ? { ...item, isLiked: !item.isLiked, likes: Math.max(0, item.likes + (item.isLiked ? -1 : 1)) } : item))
    try { await api.post('/api/food/like', { foodId: bite.id }) } catch { setBites((current) => current.map((item) => item.id === bite.id ? bite : item)) }
  }

  const handleSave = async (bite) => {
    if (!isLive) { setSavedIds(toggleSaved(bite.id)); return }
    const wasSaved = savedIds.includes(bite.id)
    setSavedIds((current) => wasSaved ? current.filter((id) => id !== bite.id) : [...current, bite.id])
    setBites((current) => current.map((item) => item.id === bite.id ? { ...item, isSaved: !wasSaved, saves: Math.max(0, item.saves + (wasSaved ? -1 : 1)) } : item))
    try { await api.post('/api/food/save', { foodId: bite.id }) } catch { setSavedIds((current) => wasSaved ? [...current, bite.id] : current.filter((id) => id !== bite.id)); setBites((current) => current.map((item) => item.id === bite.id ? bite : item)) }
  }

  const openBite = async (bite) => {
    setSelectedBite(bite)
    if (!isLive) return
    try {
      const { data } = await api.get(`/api/food/${bite.id}`)
      setSelectedBite({ ...bite, ...data.food, reviews: data.reviews || [], userReview: data.userReview, rating: data.averageRating || bite.rating })
    } catch { /* Keep the card data if details are temporarily unavailable. */ }
  }

  const handleReviewSaved = (updatedBite) => { setSelectedBite(updatedBite); setBites((current) => current.map((bite) => bite.id === updatedBite.id ? updatedBite : bite)) }
  const handleAddToCart = (bite) => {
    const price = Number(String(bite.price || '').replace(/[^0-9]/g, '')) || 320
    addToCart({ id: bite.menuItemId || bite.id, name: bite.name, price, image: bite.image }, bite.restaurantId || 'naan-beyond')
    navigate('/cart')
  }
  const handleViewRestaurant = (bite) => navigate(`/restaurant/${bite.restaurantId || 'naan-beyond'}`)

  return <main className="app-shell">
    <header className="topbar"><div className="topbar__identity"><Logo /><button className="location-switch" onClick={() => navigate('/lucknow')}>Lucknow <span>⌄</span></button></div><div className="topbar__actions">{searchOpen && <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="search-input" placeholder="Search bites" aria-label="Search bites" />}<button className="icon-button" onClick={() => setSearchOpen((open) => !open)} aria-label="Search"><Icon name="search" size={19} /></button><button className="icon-button has-dot" aria-label="Notifications"><Icon name="bell" size={19} /></button><button className="avatar-button" onClick={() => navigate('/user/login')} aria-label="Open account">AS</button></div></header>
    {authNotice && <div className="auth-notice"><span>{authNotice}</span><button onClick={() => navigate('/user/login')}>{isLive ? 'Sign in' : 'Connect account'} <Icon name="arrow" size={15} /></button></div>}
    <section className="hero-intro"><div><div className="eyebrow"><span className="eyebrow__line" /> GOOD FOOD, CLOSE BY</div><h1>Find the next<br /><em>thing you'll crave.</em></h1></div><p>Small plates, big opinions, and the places worth leaving home for.</p></section>
    <section className="signal-card" aria-label="Craveo picks"><div className="signal-card__copy"><span className="signal-card__eyebrow"><Icon name="flame" size={15} /> TODAY'S SIGNAL</span><h2>The city is craving<br /><span>something spicy.</span></h2><p>Four places turning up the heat this week.</p><button className="text-link" onClick={() => setActiveCategory('Spicy')}>Explore spicy picks <Icon name="arrow" size={16} /></button></div><div className="signal-card__art" aria-hidden="true"><div className="signal-card__circle signal-card__circle--one" /><div className="signal-card__circle signal-card__circle--two" /><span className="signal-card__stamp">HOT<br />RIGHT<br />NOW</span><span className="signal-card__pepper">✳</span></div></section>
    <section className="feed-section"><div className="section-heading"><div><span className="eyebrow">{isLive ? 'LIVE FROM CRAVEO' : 'CURATED PREVIEW'}</span><h2>Worth a detour</h2></div><span className="result-count">{filteredBites.length} bites</span></div><div className="category-scroller" role="tablist" aria-label="Food categories">{categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={`category-pill ${activeCategory === category ? 'is-active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="bite-grid">{filteredBites.map((bite) => <BiteCard key={bite.id} bite={bite} saved={savedIds.includes(bite.id)} onSave={handleSave} onLike={handleLike} onOpen={openBite} />)}</div>{filteredBites.length === 0 && <div className="no-results"><span><Icon name="search" size={19} /></span><h3>No bites match that search.</h3><button onClick={() => { setQuery(''); setActiveCategory('For you') }}>Clear filters</button></div>}</section>
    <section className="partner-banner"><div className="partner-banner__number">01</div><div><span className="eyebrow">FOR FOOD MAKERS</span><h2>Have a bite<br />worth sharing?</h2></div><button className="round-arrow" onClick={() => navigate('/create-food')} aria-label="Share a bite"><Icon name="arrow" size={20} /></button></section>
    <div className="home-footer"><Logo /><span>Made for people who plan their day around lunch.</span></div>
    {selectedBite && <BiteModal bite={selectedBite} onClose={() => setSelectedBite(null)} isLive={isLive} onReviewSaved={handleReviewSaved} onAddToCart={handleAddToCart} onViewRestaurant={handleViewRestaurant} />}
  </main>
}

export default Home
