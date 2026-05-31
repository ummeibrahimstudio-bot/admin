// ── LEAD CAPTURE POPUP ──
const POPUP_KEY = 'uis_lead_submitted';

function createPopup() {
  if (localStorage.getItem(POPUP_KEY)) return; // Already submitted

  // Load Scheherazade font if not already loaded
  if (!document.getElementById('scheherazade-font')) {
    const link = document.createElement('link');
    link.id = 'scheherazade-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap';
    document.head.appendChild(link);
  }
  const popup = document.createElement('div');
  popup.id = 'leadPopup';
  popup.innerHTML = `
    <div id="leadOverlay" style="
      position:fixed;inset:0;background:rgba(10,8,5,0.85);z-index:9999;
      display:flex;align-items:center;justify-content:center;padding:1rem;
      opacity:0;transition:opacity 0.4s ease;
    ">
      <div style="
        background:#1e1a14;border:1px solid rgba(184,146,42,0.35);border-radius:20px;
        padding:2.2rem;width:100%;max-width:420px;position:relative;
        box-shadow:0 20px 60px rgba(0,0,0,0.5);
        transform:translateY(20px);transition:transform 0.4s ease;
      " id="leadBox">
        <button onclick="closeLeadPopup()" style="
          position:absolute;top:14px;right:14px;background:rgba(184,146,42,0.1);
          border:1px solid rgba(184,146,42,0.2);color:rgba(212,174,90,0.7);
          width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px;
          display:flex;align-items:center;justify-content:center;font-family:inherit;
        ">✕</button>

        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-family:'Scheherazade New',serif;font-size:2rem;color:#D4AE5A;margin-bottom:0.4rem;direction:rtl;line-height:1.4;">
            ٱلسَّلَامُ عَلَيْكُمْ
          </div>
          <p style="color:#8C7A60;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.8rem;">Assalamu Alaikum, dear Parent! 🤍</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.55rem;color:#D4AE5A;font-weight:700;line-height:1.25;margin-bottom:0.5rem;">
            Raising a little Muslim?<br>Let's walk this path together.
          </h2>
          <p style="color:#8C7A60;font-size:0.85rem;line-height:1.65;">
            Join our community of Muslim parents — be the first to know about new Islamic learning materials, blog posts & special offers! 🌙
          </p>
        </div>

        <div id="leadForm">
          <div style="margin-bottom:0.9rem;">
            <input type="text" id="leadName" placeholder="Your Name *" style="
              width:100%;padding:11px 14px;background:#2a2318;border:1px solid rgba(184,146,42,0.25);
              border-radius:10px;color:#e8e0d0;font-size:0.92rem;outline:none;font-family:inherit;
            ">
          </div>
          <div style="margin-bottom:0.9rem;">
            <input type="tel" id="leadWa" placeholder="WhatsApp Number * (e.g. 9876543210)" style="
              width:100%;padding:11px 14px;background:#2a2318;border:1px solid rgba(184,146,42,0.25);
              border-radius:10px;color:#e8e0d0;font-size:0.92rem;outline:none;font-family:inherit;
            ">
          </div>
          <div style="margin-bottom:1.2rem;">
            <input type="email" id="leadEmail" placeholder="Email Address (optional)" style="
              width:100%;padding:11px 14px;background:#2a2318;border:1px solid rgba(184,146,42,0.25);
              border-radius:10px;color:#e8e0d0;font-size:0.92rem;outline:none;font-family:inherit;
            ">
          </div>
          <button onclick="submitLead()" style="
            width:100%;padding:13px;background:#B8922A;color:#1e1a14;border:none;
            border-radius:10px;font-size:0.95rem;font-weight:700;cursor:pointer;
            font-family:inherit;transition:background 0.2s;
          " onmouseover="this.style.background='#D4AE5A'" onmouseout="this.style.background='#B8922A'">
            🌟 Yes, Keep Me Updated!
          </button>
          <p style="text-align:center;font-size:0.72rem;color:#8C7A60;margin-top:0.8rem;">
            No spam, ever. We only share what matters. 🤍
          </p>
        </div>

        <div id="leadSuccess" style="display:none;text-align:center;padding:1rem 0;">
          <div style="font-size:3rem;margin-bottom:0.8rem;">🎉</div>
          <h3 style="color:#D4AE5A;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;margin-bottom:0.5rem;">JazakAllah Khair!</h3>
          <p style="color:#8C7A60;font-size:0.88rem;line-height:1.6;">You're all set! We'll let you know about new products and posts. 🌙</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  // Animate in
  setTimeout(() => {
    const overlay = document.getElementById('leadOverlay');
    const box = document.getElementById('leadBox');
    if (overlay) { overlay.style.opacity = '1'; }
    if (box) { box.style.transform = 'translateY(0)'; }
  }, 50);

  // Close on overlay click
  document.getElementById('leadOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeLeadPopup();
  });
}

function closeLeadPopup() {
  const overlay = document.getElementById('leadOverlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  setTimeout(() => {
    const popup = document.getElementById('leadPopup');
    if (popup) popup.remove();
  }, 400);
}

async function submitLead() {
  const name = document.getElementById('leadName').value.trim();
  const wa = document.getElementById('leadWa').value.trim();
  const email = document.getElementById('leadEmail').value.trim();

  if (!name) { alert('Please enter your name!'); return; }
  if (!wa) { alert('Please enter your WhatsApp number!'); return; }

  const btn = document.querySelector('#leadForm button');
  btn.textContent = '⏳ Saving...';
  btn.disabled = true;

  try {
    await fetch('https://sydonidhjvpcjdscdeod.supabase.co/rest/v1/leads', {
      method: 'POST',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZG9uaWRoanZwY2pkc2NkZW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMTQxNjAsImV4cCI6MjA5NTY5MDE2MH0.0eVyPQR-CX6LHgOqxBBgh9Rt4wD-P2Deq_jN_ziP1Uc',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZG9uaWRoanZwY2pkc2NkZW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMTQxNjAsImV4cCI6MjA5NTY5MDE2MH0.0eVyPQR-CX6LHgOqxBBgh9Rt4wD-P2Deq_jN_ziP1Uc',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ name, whatsapp: wa, email: email || null })
    });

    // Mark as submitted in browser
    localStorage.setItem(POPUP_KEY, '1');

    // Show success
    document.getElementById('leadForm').style.display = 'none';
    document.getElementById('leadSuccess').style.display = 'block';

    setTimeout(() => closeLeadPopup(), 3000);
  } catch(e) {
    btn.textContent = '🌟 Yes, Keep Me Updated!';
    btn.disabled = false;
    alert('Something went wrong. Please try again!');
  }
}

// Show popup after 12 seconds
setTimeout(createPopup, 12000);
