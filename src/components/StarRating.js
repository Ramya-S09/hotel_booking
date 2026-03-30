// src/components/StarRating.js
import React from 'react';

export default function StarRating({ rating = 0, max = 5, size = 'sm' }) {
  const fontSize = size === 'lg' ? '1.1rem' : '0.85rem';
  return (
    <span className="stars" style={{ fontSize }}>
      {Array.from({ length: max }, (_, i) => (
        <i
          key={i}
          className={
            i < Math.floor(rating)
              ? 'bi bi-star-fill'
              : i < rating
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        ></i>
      ))}
      <span style={{ color: '#888', fontSize: '0.82rem', marginLeft: '0.3rem', fontFamily: 'var(--font-body)' }}>
        ({rating.toFixed(1)})
      </span>
    </span>
  );
}
