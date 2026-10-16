import { signIn } from './actions';
import ErrorNotice from './error-notice';

export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){
 const {error}=await searchParams;
 return <main className="mx-auto max-w-md px-5 py-20"><form action={signIn} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-3xl font-bold">Login Pengurus</h1><p className="mt-2 text-sm text-slate-500">Masuk menggunakan akun pengurus yang telah didaftarkan.</p><label className="mt-8 block text-sm font-semibold">Email<input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-emerald-700"/></label><label className="mt-5 block text-sm font-semibold">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-emerald-700"/></label>{error&&<ErrorNotice message={error}/>}<button className="mt-7 w-full rounded-xl bg-emerald-800 p-3 font-semibold text-white">Masuk Dashboard</button></form></main>
}
