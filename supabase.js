create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  icon text not null default '📦',
  sort_order integer default 0,
  created_at timestamp default now()
);

create table if not exists settings (
  key text primary key,
  value text
);

insert into settings (key, value) values
  ('whatsapp', '+918444968880'),
  ('instagram', 'ummeibrahim.studio'),
  ('substack', 'ummeibrahimstudio.substack.com'),
  ('beacons', 'beacons.ai/ummeibrahim.studio'),
  ('x_twitter', ''),
  ('threads', ''),
  ('facebook', ''),
  ('youtube', ''),
  ('tagline', 'Raising a Screen-Free Little Ummah'),
  ('delivery_note', 'All India Delivery Available'),
  ('hero_title', 'Nurturing Little Muslim Hearts Through Learning & Play'),
  ('hero_subtitle', 'Handcrafted Islamic books, flash cards, and charts — designed to raise a screen-free, faith-filled generation.')
on conflict (key) do nothing;

insert into categories (name, icon, sort_order) values
  ('Books', '📚', 1),
  ('Flash Cards', '🃏', 2),
  ('Charts', '📜', 3),
  ('Workbooks', '📓', 4),
  ('Activity Books', '🎨', 5),
  ('Posters', '🖼️', 6),
  ('Stickers', '⭐', 7),
  ('Bundles', '🎁', 8)
on conflict do nothing;
