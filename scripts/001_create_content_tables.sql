-- Create admin profiles table
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now()
);

alter table public.admin_profiles enable row level security;

-- Admin profiles policies
create policy "admin_profiles_select"
  on public.admin_profiles for select
  using (auth.uid() = id);

create policy "admin_profiles_insert"
  on public.admin_profiles for insert
  with check (auth.uid() = id);

create policy "admin_profiles_update"
  on public.admin_profiles for update
  using (auth.uid() = id);

-- Create hero content table
create table if not exists public.hero_content (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_vi text not null,
  subtitle_en text not null,
  subtitle_vi text not null,
  description_en text not null,
  description_vi text not null,
  cta_primary_text_en text not null,
  cta_primary_text_vi text not null,
  cta_primary_url text not null,
  cta_secondary_text_en text not null,
  cta_secondary_text_vi text not null,
  cta_secondary_url text not null,
  updated_at timestamp with time zone default now(),
  updated_by uuid references auth.users(id)
);

alter table public.hero_content enable row level security;

-- Hero content policies (public read, admin write)
create policy "hero_content_select_all"
  on public.hero_content for select
  using (true);

create policy "hero_content_insert_admin"
  on public.hero_content for insert
  with check (auth.uid() is not null);

create policy "hero_content_update_admin"
  on public.hero_content for update
  using (auth.uid() is not null);

create policy "hero_content_delete_admin"
  on public.hero_content for delete
  using (auth.uid() is not null);

-- Create partners table
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  category text not null, -- 'csp', 'technology', 'consulting'
  website_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  updated_by uuid references auth.users(id)
);

alter table public.partners enable row level security;

-- Partners policies
create policy "partners_select_active"
  on public.partners for select
  using (is_active = true);

create policy "partners_insert_admin"
  on public.partners for insert
  with check (auth.uid() is not null);

create policy "partners_update_admin"
  on public.partners for update
  using (auth.uid() is not null);

create policy "partners_delete_admin"
  on public.partners for delete
  using (auth.uid() is not null);

-- Create certifications table
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_vi text not null,
  provider text not null, -- 'aws', 'azure', 'google-cloud'
  badge_url text not null,
  description_en text,
  description_vi text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  updated_by uuid references auth.users(id)
);

alter table public.certifications enable row level security;

-- Certifications policies
create policy "certifications_select_active"
  on public.certifications for select
  using (is_active = true);

create policy "certifications_insert_admin"
  on public.certifications for insert
  with check (auth.uid() is not null);

create policy "certifications_update_admin"
  on public.certifications for update
  using (auth.uid() is not null);

create policy "certifications_delete_admin"
  on public.certifications for delete
  using (auth.uid() is not null);

-- Create articles/insights table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_vi text not null,
  slug text not null unique,
  excerpt_en text not null,
  excerpt_vi text not null,
  content_en text not null,
  content_vi text not null,
  featured_image_url text,
  category text not null, -- 'news', 'case-study', 'blog'
  tags text[] default '{}',
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author_id uuid references auth.users(id)
);

alter table public.articles enable row level security;

-- Articles policies
create policy "articles_select_published"
  on public.articles for select
  using (is_published = true);

create policy "articles_insert_admin"
  on public.articles for insert
  with check (auth.uid() is not null);

create policy "articles_update_admin"
  on public.articles for update
  using (auth.uid() is not null);

create policy "articles_delete_admin"
  on public.articles for delete
  using (auth.uid() is not null);

-- Create feature cards table
create table if not exists public.feature_cards (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_vi text not null,
  description_en text not null,
  description_vi text not null,
  icon_name text not null, -- lucide icon name
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  updated_by uuid references auth.users(id)
);

alter table public.feature_cards enable row level security;

-- Feature cards policies
create policy "feature_cards_select_active"
  on public.feature_cards for select
  using (is_active = true);

create policy "feature_cards_insert_admin"
  on public.feature_cards for insert
  with check (auth.uid() is not null);

create policy "feature_cards_update_admin"
  on public.feature_cards for update
  using (auth.uid() is not null);

create policy "feature_cards_delete_admin"
  on public.feature_cards for delete
  using (auth.uid() is not null);

-- Create indexes for better performance
create index if not exists idx_partners_category on public.partners(category);
create index if not exists idx_partners_display_order on public.partners(display_order);
create index if not exists idx_certifications_provider on public.certifications(provider);
create index if not exists idx_certifications_display_order on public.certifications(display_order);
create index if not exists idx_articles_slug on public.articles(slug);
create index if not exists idx_articles_category on public.articles(category);
create index if not exists idx_articles_published on public.articles(is_published, published_at);
create index if not exists idx_feature_cards_display_order on public.feature_cards(display_order);
