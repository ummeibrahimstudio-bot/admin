const SUPABASE_URL = 'https://sydonidhjvpcjdscdeod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZG9uaWRoanZwY2pkc2NkZW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMTQxNjAsImV4cCI6MjA5NTY5MDE2MH0.0eVyPQR-CX6LHgOqxBBgh9Rt4wD-P2Deq_jN_ziP1Uc';

async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
    ...options,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

async function getProducts() {
  return sbFetch('products?order=created_at.asc&select=*');
}

async function getBlogs() {
  return sbFetch('blogs?order=created_at.desc&select=*');
}
