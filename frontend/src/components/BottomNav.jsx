import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cartCount, getCart } from '../lib/cart'
import '../styles/bottom-nav.css'

const HomeIcon = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" /></svg>
const ReelIcon = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="m9 3 3 4M15 3l3 4M10 11l5 3-5 3v-6Z" /></svg>
const BagIcon = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>
const OrdersIcon = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-6-3-6 3V3Z" /><path d="M9 8h6M9 12h6" /></svg>
const SaveIcon = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" /></svg>

const BottomNav = () => {
  const [bagCount, setBagCount] = useState(() => cartCount(getCart()))
  useEffect(() => { const sync = () => setBagCount(cartCount(getCart())); window.addEventListener('storage', sync); const interval = window.setInterval(sync, 500); return () => { window.removeEventListener('storage', sync); window.clearInterval(interval) } }, [])
  const links = [
    { to: '/', label: 'Home', icon: <HomeIcon />, end: true },
    { to: '/reels', label: 'Reels', icon: <ReelIcon /> },
    { to: '/cart', label: 'Bag', icon: <BagIcon />, badge: bagCount },
    { to: '/orders', label: 'Orders', icon: <OrdersIcon /> },
    { to: '/saved', label: 'Saved', icon: <SaveIcon /> },
  ]
  return <nav className="bottom-nav" role="navigation" aria-label="Primary"><div className="bottom-nav__inner">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}><span className="bottom-nav__icon">{link.icon}{link.badge > 0 && <b>{link.badge}</b>}</span><span className="bottom-nav__label">{link.label}</span></NavLink>)}</div></nav>
}

export default BottomNav
