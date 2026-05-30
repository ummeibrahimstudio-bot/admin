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
  if (!res.ok) { const e = await res.text(); throw new Error(e); }
  const t = await res.text();
  return t ? JSON.parse(t) : [];
}

async function uploadFile(file, bucket) {
  const ext = file.name.split('.').pop().toLowerCase();
  const fileName = `file_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  // Force correct content type
  const mimeMap = { html: 'text/html', htm: 'text/html', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp' };
  const contentType = mimeMap[ext] || file.type || 'application/octet-stream';
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': contentType,
      'x-upsert': 'true',
      'Cache-Control': '3600'
    },
    body: file
  });
  if (!res.ok) { const e = await res.text(); throw new Error('Upload failed: ' + e); }
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
}

async function uploadImage(file) { return uploadFile(file, 'product-images'); }
async function uploadBlogFile(file) { return uploadFile(file, 'blog-files'); }

async function getProducts() { return sbFetch('products?order=created_at.asc&select=*'); }
async function getBlogs() { return sbFetch('blogs?order=created_at.desc&select=*'); }
async function getCategories() { return sbFetch('categories?order=sort_order.asc&select=*'); }
async function getSettings() {
  const rows = await sbFetch('settings?select=*');
  const obj = {};
  rows.forEach(r => obj[r.key] = r.value);
  return obj;
}
async function saveSetting(key, value) {
  return sbFetch(`settings?key=eq.${key}`, { method: 'PATCH', body: JSON.stringify({ value }) });
}
