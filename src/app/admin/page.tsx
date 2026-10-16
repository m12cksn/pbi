import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import AdminDashboard from './admin-dashboard';

export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <main className="public-page"><div className="section-shell"><p className="kicker">Konfigurasi diperlukan</p><h1>Hubungkan Supabase</h1><div className="empty-state">Salin <strong>.env.example</strong> menjadi <strong>.env.local</strong>, lalu isi URL dan anon key Supabase. Restart server setelah menyimpan.</div></div></main>;
  }
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/login');
  const { data: admin, error: adminError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (adminError) throw new Error('Gagal memverifikasi akses admin', { cause: adminError });
  if (!admin) redirect('/');
  const [announcements, events, finance, suggestions, funds] = await Promise.all([
    supabase.from('announcements').select('*').order('created_at', { ascending: false }),
    supabase.from('events').select('*').order('starts_at'),
    supabase.from('finance_entries').select('*').order('occurred_on', { ascending: false }),
    supabase.from('suggestions').select('*').order('created_at', { ascending: false }),
    supabase.from('finance_funds').select('*').order('sort_order'),
  ]);
  return <AdminDashboard email={user.email ?? 'Pengurus'} initialAnnouncements={announcements.data ?? []} initialEvents={events.data ?? []} initialFinance={finance.data ?? []} initialSuggestions={suggestions.data ?? []} funds={funds.data ?? []} financeSetupRequired={Boolean(funds.error)} />;
}
