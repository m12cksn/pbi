import type {Metadata} from 'next';
import Header from '@/components/header';
import './globals.css';
export const metadata:Metadata={title:'Portal Warga RT 01/16 | Bandengan Indah',description:'Pusat informasi dan kegiatan warga RT 01/16 Perum Bandengan Indah, Cilacap Selatan'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id" data-scroll-behavior="smooth"><body><Header/>{children}</body></html>}
