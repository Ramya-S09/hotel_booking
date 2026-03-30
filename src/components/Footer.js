// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-luxe mt-5">
      © {new Date().getFullYear()} <span>LuxeStay</span> — Premium Hotel Booking. All rights reserved.
    </footer>
  );
}
