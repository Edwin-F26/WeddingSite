-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Creates the table the RSVP form writes to and locks it down so the
-- browser (publishable key) can only INSERT. Nobody using the public key can
-- read, change, or delete rows; view responses in Table Editor -> rsvps.

create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text check (email is null or char_length(email) <= 254),
  attending   boolean not null,
  guests      smallint not null default 1 check (guests between 1 and 10),
  dietary     text check (dietary is null or char_length(dietary) <= 500),
  message     text check (message is null or char_length(message) <= 1000)
);

alter table public.rsvps enable row level security;

drop policy if exists "guests can submit an rsvp" on public.rsvps;
create policy "guests can submit an rsvp"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- Belt and braces: make sure the public role has no other privileges.
revoke all on public.rsvps from anon;
grant insert on public.rsvps to anon;
