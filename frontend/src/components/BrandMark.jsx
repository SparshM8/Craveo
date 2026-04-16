import React from 'react'

const BrandMark = ({ compact = false }) => (
  <div className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-label="Craveo home">
    <span className="brand-mark__glyph" aria-hidden="true">C</span>
    <span className="brand-mark__word">Craveo</span>
  </div>
)

export default BrandMark
