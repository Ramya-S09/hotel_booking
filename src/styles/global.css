:root {
  --cream: #f8f4ef;
  --sand: #e8ddd0;
  --gold: #b8975a;
  --gold-light: #d4b484;
  --charcoal: #2c2c2c;
  --slate: #5a5a5a;
  --white: #ffffff;
  --danger: #c0392b;
  --success: #27ae60;
  --border: #ddd5c8;
  --shadow: 0 2px 24px rgba(44,44,44,0.08);
  --shadow-lg: 0 8px 48px rgba(44,44,44,0.14);
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;
  --radius: 4px;
  --radius-lg: 10px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--charcoal);
  font-size: 15px;
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.2;
}

a { color: var(--gold); text-decoration: none; }
a:hover { color: var(--gold-light); }

/* ── Navbar ── */
.navbar-luxe {
  background: var(--charcoal);
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
}
.navbar-brand-luxe {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--gold) !important;
  letter-spacing: 0.02em;
}
.navbar-brand-luxe span { color: var(--white); }
.navbar-nav-luxe { display: flex; align-items: center; gap: 0.5rem; }
.nav-link-luxe {
  color: #ccc !important;
  font-size: 0.88rem;
  font-weight: 400;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius);
  transition: color 0.2s;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.nav-link-luxe:hover { color: var(--gold) !important; }
.btn-nav-login {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold) !important;
  padding: 0.35rem 1.1rem;
  border-radius: var(--radius);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.2s;
}
.btn-nav-login:hover { background: var(--gold); color: var(--charcoal) !important; }
.btn-nav-register {
  background: var(--gold);
  border: 1px solid var(--gold);
  color: var(--charcoal) !important;
  padding: 0.35rem 1.1rem;
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.2s;
}
.btn-nav-register:hover { background: var(--gold-light); }

/* ── Buttons ── */
.btn-gold {
  background: var(--gold);
  color: var(--charcoal);
  border: none;
  padding: 0.65rem 1.8rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
.btn-gold:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.btn-outline-gold {
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 0.55rem 1.4rem;
  border-radius: var(--radius);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-gold:hover { background: var(--gold); color: var(--charcoal); }

/* ── Cards ── */
.card-luxe {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: box-shadow 0.25s, transform 0.25s;
}
.card-luxe:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }

/* ── Form inputs ── */
.input-luxe {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--white);
  color: var(--charcoal);
  font-family: var(--font-body);
  font-size: 0.92rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.input-luxe:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(184,151,90,0.12);
}
.input-luxe::placeholder { color: #aaa; }
label.form-label-luxe {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--slate);
  margin-bottom: 0.3rem;
  display: block;
}

/* ── Alerts ── */
.alert-luxe-danger {
  background: #fdf0ef;
  border: 1px solid #f5c6c2;
  color: var(--danger);
  border-radius: var(--radius);
  padding: 0.65rem 1rem;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.alert-luxe-success {
  background: #edf7f1;
  border: 1px solid #b7e0c8;
  color: var(--success);
  border-radius: var(--radius);
  padding: 0.65rem 1rem;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ── Star rating ── */
.stars { color: var(--gold); letter-spacing: 1px; font-size: 0.85rem; }

/* ── Badge ── */
.badge-luxe {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.badge-confirmed { background: #edf7f1; color: var(--success); border: 1px solid #b7e0c8; }
.badge-pending   { background: #fff8e6; color: #d4920a; border: 1px solid #f7d87a; }
.badge-cancelled { background: #fdf0ef; color: var(--danger); border: 1px solid #f5c6c2; }
.badge-completed { background: #f0f0f0; color: #666; border: 1px solid #ddd; }

/* ── Page header ── */
.page-header {
  background: var(--charcoal);
  padding: 3.5rem 0 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(184,151,90,0.15) 0%, transparent 60%);
}
.page-header h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--white);
  position: relative;
}
.page-header p { color: #aaa; font-size: 1rem; position: relative; margin-top: 0.4rem; }

/* ── Divider ── */
.divider-gold {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
  margin: 1.5rem 0;
}

/* ── Spinner ── */
.spinner-gold {
  width: 36px; height: 36px;
  border: 3px solid var(--sand);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 2rem auto;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Footer ── */
.footer-luxe {
  background: var(--charcoal);
  color: #999;
  text-align: center;
  padding: 1.8rem;
  font-size: 0.83rem;
  margin-top: auto;
  border-top: 1px solid #3a3a3a;
}
.footer-luxe span { color: var(--gold); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .navbar-luxe { padding: 0 1rem; }
  .navbar-nav-luxe { gap: 0.2rem; }
  .nav-link-luxe { padding: 0.3rem 0.5rem; font-size: 0.78rem; }
}
