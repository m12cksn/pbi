import Link from 'next/link';
import {ArrowDownRight,ArrowRight,CalendarDays,ChevronRight,FileText,Images,MapPin,MessageCircleMore,ShieldCheck,Sparkles,Users,WalletCards} from 'lucide-react';
import { createClient } from '@/lib/supabase-server';

const services=[
  {number:'01',title:'Transparansi Kas',text:'Catatan pemasukan dan pengeluaran lingkungan yang mudah dipantau warga.',icon:WalletCards,href:'/keuangan',tone:'mint'},
  {number:'02',title:'Jadwal Ronda',text:'Cek giliran jaga dan koordinasi keamanan lingkungan dalam satu tempat.',icon:ShieldCheck,href:'/ronda',tone:'ink'},
  {number:'03',title:'Notulen Warga',text:'Hasil musyawarah dan keputusan bersama tersimpan rapi dan terbuka.',icon:FileText,href:'/notulen',tone:'sand'},
  {number:'04',title:'Ruang Aspirasi',text:'Sampaikan ide, masukan, atau kebutuhan untuk lingkungan yang lebih baik.',icon:MessageCircleMore,href:'/aspirasi',tone:'coral'},
  {number:'05',title:'Kabar Kegiatan',text:'Temukan agenda dan dokumentasi momen kebersamaan warga.',icon:Images,href:'/kegiatan',tone:'plain'},
  {number:'06',title:'Kenal Pengurus',text:'Struktur pengurus serta jalur komunikasi RT yang mudah ditemukan.',icon:Users,href:'/organisasi',tone:'plain'}
];
const sampleEvents=[
  {day:'18',month:'OKT',title:'Kerja Bakti Lingkungan',time:'07.00 WIB',place:'Area taman utama'},
  {day:'25',month:'OKT',title:'Rapat Koordinasi Warga',time:'19.30 WIB',place:'Balai pertemuan'}
];

export const dynamic='force-dynamic';
export default async function Home(){
 let announcement:{title:string;body:string;created_at:string}|null=null;
 let databaseEvents:{id:string;title:string;location:string|null;starts_at:string}[]|null=null;
 if(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY){
  const supabase=await createClient();
  const results=await Promise.all([
   supabase.from('announcements').select('title,body,created_at').eq('is_published',true).order('created_at',{ascending:false}).limit(1).maybeSingle(),
   supabase.from('events').select('id,title,location,starts_at').eq('is_published',true).gte('starts_at',new Date().toISOString()).order('starts_at').limit(3)
  ]);
  announcement=results[0].data;databaseEvents=results[1].data;
 }
 const visibleEvents=databaseEvents?.length?databaseEvents.map(event=>{const date=new Date(event.starts_at);return{day:String(date.getDate()).padStart(2,'0'),month:date.toLocaleString('id-ID',{month:'short'}).toUpperCase(),title:event.title,time:date.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})+' WIB',place:event.location||'Lokasi menyusul'}}):sampleEvents;
 return <main>
  <section className="hero">
    <div className="hero-grid" aria-hidden="true"/><div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
    <div className="hero-inner">
      <div className="hero-copy"><p className="eyebrow"><span/> Portal resmi lingkungan</p><h1>Tetangga dekat.<br/><em>Informasi melekat.</em></h1><p className="hero-lead">Ruang digital warga RT 01/16 untuk berbagi kabar, menjaga transparansi, dan merawat kebersamaan di Bandengan Indah.</p><div className="hero-actions"><Link href="#layanan" className="button-primary">Jelajahi portal <ArrowDownRight size={18}/></Link><Link href="/aspirasi" className="button-ghost">Sampaikan aspirasi <ArrowRight size={17}/></Link></div></div>
      <div className="hero-panel"><div className="location-card"><div className="location-icon"><MapPin size={24}/></div><p>Rumah kita</p><h2>RT 01 <span>/</span> RW 16</h2><div className="address-line"><span>Perum Bandengan Indah</span><span>Cilacap Selatan · Cilacap</span></div></div><div className="welcome-note"><Sparkles size={18}/><p><strong>Selamat datang, tetangga!</strong> Semua yang perlu diketahui tentang lingkungan kita ada di sini.</p></div></div>
    </div>
    <div className="hero-ticker" aria-label="Nilai lingkungan"><div><span>Guyub</span><i>✦</i><span>Terbuka</span><i>✦</i><span>Aman</span><i>✦</i><span>Peduli</span><i>✦</i><span>Guyub</span><i>✦</i></div></div>
  </section>

  <section id="layanan" className="services-section section-shell">
    <div className="section-heading"><div><p className="kicker">Yang bisa diakses</p><h2>Satu pintu untuk<br/>kebutuhan warga.</h2></div><p>Informasi yang semula tersebar kini hadir lebih ringkas, lebih terbuka, dan dapat diakses kapan saja.</p></div>
    <div className="service-grid">{services.map(({number,title,text,icon:Icon,href,tone})=><Link href={href} className={`service-card ${tone}`} key={title}><div className="service-top"><span>{number}</span><Icon size={25}/></div><div><h3>{title}</h3><p>{text}</p></div><span className="service-arrow"><ChevronRight size={19}/></span></Link>)}</div>
  </section>

  <section className="news-section"><div className="section-shell news-grid">
    <div className="announcement-block"><p className="kicker light">Kabar lingkungan</p><h2>Yang terbaru<br/>di sekitar kita.</h2><article className="announcement-card"><div className="announcement-meta"><span>Pengumuman</span><time>{announcement?'Terbaru':'Informasi'}</time></div><h3>{announcement?.title||'Selamat datang di Portal Warga Bandengan Indah'}</h3><p>{announcement?.body||'Portal ini sedang dipersiapkan sebagai pusat informasi dan komunikasi resmi RT 01/16. Kabar dari pengurus akan segera hadir di sini.'}</p><small>{announcement?'Diterbitkan oleh pengurus RT 01/16':'Belum ada pengumuman yang diterbitkan'}</small></article></div>
    <div className="agenda-block"><div className="agenda-title"><div><p className="kicker">Agenda bersama</p><h2>Jangan lewatkan.</h2></div><CalendarDays size={28}/></div>{!databaseEvents?.length&&<p className="sample-label">Contoh agenda tampilan — bukan jadwal resmi</p>}<div className="agenda-list">{visibleEvents.map(event=><article className="agenda-item" key={`${event.title}-${event.day}`}><div className="agenda-date"><strong>{event.day}</strong><span>{event.month}</span></div><div><h3>{event.title}</h3><p>{event.time}</p><span><MapPin size={13}/>{event.place}</span></div></article>)}</div><Link href="/kegiatan" className="text-link">Lihat semua kegiatan <ArrowRight size={17}/></Link></div>
  </div></section>

  <section className="identity-section section-shell"><div className="identity-mark" aria-hidden="true"><span>01</span><small>16</small></div><div className="identity-copy"><p className="kicker">Dari warga, untuk warga</p><h2>Lingkungan yang nyaman dimulai dari komunikasi yang baik.</h2><p>Portal ini hadir sebagai ruang bersama untuk mengenal, mendengar, dan saling membantu—karena tetangga bukan sekadar tinggal berdekatan.</p></div><Link href="/organisasi" className="round-link" aria-label="Kenali pengurus"><ArrowUpRightIcon/></Link></section>
  <section className="cta-section section-shell"><div className="cta-card"><p>Punya ide atau masukan?</p><h2>Suaramu ikut membentuk<br/><em>lingkungan kita.</em></h2><Link href="/aspirasi" className="button-light">Tulis aspirasi <ArrowRight size={18}/></Link></div></section>
  <footer className="footer"><div className="section-shell footer-inner"><div className="footer-brand"><span className="brand-mark"><b>01</b><small>/16</small></span><div><strong>Bandengan Indah</strong><p>Cilacap Selatan, Cilacap</p></div></div><p>© {new Date().getFullYear()} Portal Warga RT 01/16</p><Link href="/login">Login Pengurus <ArrowRight size={14}/></Link></div></footer>
</main>}

function ArrowUpRightIcon(){return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M7 7h10v10"/></svg>}
