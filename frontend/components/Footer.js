import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#413224',
      color: 'rgba(255,255,255,0.6)',
      padding: '2rem 1.5rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.85rem',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#e57b2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>TravelHub</span>
          <span style={{ marginLeft: 8 }}>© {new Date().getFullYear()}</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { href: '/',              label: 'Home'     },
            { href: '/feed',          label: 'Explore'  },
            { href: '/login',         label: 'Log In'   },
            { href: '/register',      label: 'Sign Up'  },
            { href: '/create-listing',label: 'List an Experience' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#e57b2f'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
