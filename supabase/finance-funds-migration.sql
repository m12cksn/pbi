-- Jalankan sekali di Supabase SQL Editor setelah schema.sql.
create table if not exists public.finance_funds (
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 sort_order integer not null default 0,
 is_active boolean not null default true,
 created_at timestamptz not null default now()
);

create table if not exists public.finance_entries (
 id uuid primary key default gen_random_uuid(),
 description text not null,
 amount numeric(14,2) not null check(amount > 0),
 kind text not null check(kind in ('income','expense')),
 occurred_on date not null,
 fund_id uuid references public.finance_funds(id) on delete restrict,
 is_published boolean not null default false,
 created_at timestamptz not null default now()
);

alter table public.finance_entries
 add column if not exists fund_id uuid references public.finance_funds(id) on delete restrict;

insert into public.finance_funds(name, sort_order) values
 ('Kas Arisan', 10),
 ('Kas Sosial', 20),
 ('Kas Pembangunan', 30),
 ('Kas Donatur', 40),
 ('Kas Agustusan', 50)
on conflict (name) do update set sort_order = excluded.sort_order;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.admin_users where user_id=(select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.finance_funds enable row level security;
alter table public.finance_entries enable row level security;
drop policy if exists "Active finance funds readable" on public.finance_funds;
create policy "Active finance funds readable" on public.finance_funds
 for select to anon,authenticated using (is_active or (select public.is_admin()));
drop policy if exists "Admin manages finance funds" on public.finance_funds;
create policy "Admin manages finance funds" on public.finance_funds
 for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "Published finance readable" on public.finance_entries;
create policy "Published finance readable" on public.finance_entries
 for select to anon,authenticated using (is_published or (select public.is_admin()));
drop policy if exists "Admin manages finance" on public.finance_entries;
create policy "Admin manages finance" on public.finance_entries
 for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create index if not exists finance_entries_fund_date_idx
 on public.finance_entries(fund_id, occurred_on desc);
