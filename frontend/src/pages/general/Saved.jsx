import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import { demoBites, getSavedIds, toggleSaved } from '../../lib/demoData'
import '../../App.css'

const BookmarkIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" /></svg>

const mapSavedFood = (saved) => {
  const item = saved.food || saved
  const partner = item.foodPartner && typeof item.foodPartner === 'object' ? item.foodPartner : null
  return { ...item, id: item._id || item.id, partner: item.foodPartnerName || partner?.name || 'Craveo food maker', location: partner?.address || 'Near you', category: item.category || 'Saved bite', price: item.price || 'Ask for today’s price', rating: item.rating || 'New', image: item.image || null, video: item.video || null }
}

const Saved = () => {
  const navigate = useNavigate()
  const [bites, setBites] = useState([])
  const [isLive, setIsLive] = useState(false)
  const [needsLogin, setNeedsLogin] = useState(false)

  useEffect(() => {
    let active = true
    api.get('/api/food/save').then(({ data }) => {
      if (!active) return
      setBites((data.savedFoods || []).map(mapSavedFood))
      setIsLive(true)
    }).catch((error) => {
      if (!active) return
      setNeedsLogin(error.response?.status === 401)
      setBites(demoBites.filter((bite) => getSavedIds().includes(bite.id)))
    })
    return () => { active = false }
  }, [])

  const removeSaved = async (id) => {
    if (!isLive) { setBites((current) => current.filter((bite) => bite.id !== id)); toggleSaved(id); return }
    setBites((current) => current.filter((bite) => bite.id !== id))
    try { await api.post('/api/food/save', { foodId: id }) } catch { /* The list stays usable if a mutation is interrupted. */ }
  }

  return <main className="app-shell saved-page">
    <header className="topbar"><button className="back-button" onClick={() => navigate('/')} aria-label="Back to home">←</button><div className="saved-title"><span className="eyebrow">YOUR COLLECTION</span><h1>Saved bites</h1></div><div className="saved-total">{bites.length.toString().padStart(2, '0')}</div></header>
    <section className="saved-intro"><p>Keep the places you want to come back to. Your shortlist, minus the screenshots.</p>{needsLogin && <button className="inline-login" onClick={() => navigate('/user/login')}>Sign in to sync your collection →</button>}</section>
    {bites.length > 0 ? <div className="bite-grid saved-grid">{bites.map((bite) => <article className="bite-card saved-card" key={bite.id}><div className="bite-card__image-wrap">{bite.image ? <img src={bite.image} alt={bite.name} className="bite-card__image" /> : bite.video ? <video src={bite.video} className="bite-card__image" muted loop autoPlay playsInline /> : <div className="bite-card__image media-fallback" />}<button className="save-button is-saved" onClick={() => removeSaved(bite.id)} aria-label={`Remove ${bite.name} from saved`}><BookmarkIcon size={18} /></button><span className="bite-card__category">{bite.category}</span></div><div className="bite-card__body"><div className="bite-card__heading"><div><h3>{bite.name}</h3><p>{bite.partner}</p></div><span className="rating"><span>★</span> {bite.rating}</span></div><div className="bite-card__meta"><span>{bite.location}</span><strong>{bite.price}</strong></div></div></article>)}</div> : <div className="saved-empty"><div className="saved-empty__icon"><BookmarkIcon size={28} /></div><span className="eyebrow">A LITTLE ROOM TO FILL</span><h2>Your future favorites<br />will live here.</h2><p>Tap the bookmark on a bite that deserves a second visit.</p><button className="primary-button" onClick={() => navigate('/')}>Discover bites <span>→</span></button></div>}
  </main>
}

export default Saved
