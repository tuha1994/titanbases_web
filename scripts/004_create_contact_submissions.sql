-- Create contact submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  status text default 'new' check (status in ('new', 'in-progress', 'resolved', 'archived')),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  updated_by uuid references auth.users(id)
);

alter table public.contact_submissions enable row level security;

-- Contact submissions policies
-- Public can insert (submit forms)
create policy "contact_submissions_insert_public"
  on public.contact_submissions for insert
  with check (true);

-- Only admins can read all submissions
create policy "contact_submissions_select_admin"
  on public.contact_submissions for select
  using (auth.uid() is not null);

-- Only admins can update submissions
create policy "contact_submissions_update_admin"
  on public.contact_submissions for update
  using (auth.uid() is not null);

-- Only admins can delete submissions
create policy "contact_submissions_delete_admin"
  on public.contact_submissions for delete
  using (auth.uid() is not null);

-- Create indexes for better performance
create index if not exists idx_contact_submissions_status on public.contact_submissions(status);
create index if not exists idx_contact_submissions_created_at on public.contact_submissions(created_at desc);
create index if not exists idx_contact_submissions_email on public.contact_submissions(email);

-- Create function to update updated_at timestamp
create or replace function update_contact_submission_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger contact_submissions_updated_at
  before update on public.contact_submissions
  for each row
  execute function update_contact_submission_updated_at();
