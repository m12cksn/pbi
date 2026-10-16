'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [['Beranda', '/'], ['Pengurus', '/organisasi'], ['Keuangan', '/keuangan'], ['Kegiatan', '/kegiatan'], ['Notulen', '/notulen'], ['Ronda', '/ronda']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header">
    <div className="nav-shell">
      <Link href="/" className="brand" aria-label="Beranda RT 01/16">
        <span className="brand-mark"><b>01</b><small>/16</small></span>
        <span className="brand-copy"><strong>Bandengan Indah</strong><small>Portal Warga</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Navigasi utama">{links.map(([name, url]) => <Link key={url} href={url} className={pathname === url ? 'active' : ''}>{name}</Link>)}</nav>
      <div className="nav-actions">
        <Link href="/aspirasi" className="aspiration-link">Aspirasi <ArrowUpRight size={15} /></Link>
        <button type="button" className="menu-button" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className="mobile-nav" aria-label="Navigasi seluler">{[...links, ['Kritik & Saran', '/aspirasi'], ['Login Pengurus', '/login']].map(([name, url], index) => <Link onClick={() => setOpen(false)} key={url} href={url}><span>{String(index + 1).padStart(2, '0')}</span>{name}</Link>)}</nav>}
  </header>;
}
