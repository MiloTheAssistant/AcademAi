-- AcademAI Phase 1 database schema for Neon Postgres.
-- Apply this in the linked Neon database before enabling paid learning in production.

create table if not exists subscriptions (
  user_id text primary key,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  status text not null,
  plan_interval text not null,
  current_period_end integer not null,
  trial_end integer,
  updated_at timestamptz not null default now()
);

create unique index if not exists subscriptions_stripe_customer_id_idx
  on subscriptions (stripe_customer_id);

create table if not exists lesson_progress (
  user_id text not null,
  course_slug text not null,
  module_index integer not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_slug, module_index)
);

create table if not exists assessment_attempts (
  id text primary key,
  user_id text not null,
  provider text not null,
  course_slug text not null,
  score integer not null,
  correct_count integer not null,
  total_questions integer not null,
  passed boolean not null,
  answers jsonb not null,
  feedback jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists assessment_attempts_user_course_idx
  on assessment_attempts (user_id, course_slug, created_at desc);

create table if not exists generated_syllabi (
  id text primary key,
  user_id text not null,
  provider text not null,
  goal text not null,
  skill_level text not null,
  learning_path text not null,
  modules jsonb not null,
  source text not null,
  generation_status text not null default 'ready',
  generation_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table generated_syllabi
  add column if not exists generation_status text not null default 'ready';

alter table generated_syllabi
  add column if not exists generation_error text;

alter table generated_syllabi
  add column if not exists updated_at timestamptz not null default now();

create index if not exists generated_syllabi_user_created_idx
  on generated_syllabi (user_id, created_at desc);

create table if not exists certificates (
  id text primary key,
  user_id text not null,
  provider text not null,
  course_slug text not null,
  course_title text not null,
  score integer not null,
  issued_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

create index if not exists certificates_user_issued_idx
  on certificates (user_id, issued_at desc);
