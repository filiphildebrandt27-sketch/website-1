/* =========================================================
   Hildebrandt Objektservice — main.js
   ---------------------------------------------------------
   ► HIER die echten Kontaktdaten eintragen, sobald vorhanden.
     Diese Werte füllen automatisch alle Telefon- und
     WhatsApp-Buttons auf der gesamten Webseite.
   ========================================================= */
const KONTAKT = {
  // Telefonnummer im internationalen Format, NUR Ziffern (für tel:-Link)
  telefon: "491797313486",
  // Anzeige-Telefonnummer (so wie sie der Besucher sehen soll)
  telefonAnzeige: "+49 179 7313486",
  // WhatsApp-Nummer, NUR Ziffern, mit Ländervorwahl ohne + oder 00
  whatsapp: "491797313486",
  // Vorausgefüllte WhatsApp-Nachricht
  whatsappText: "Hallo Hildebrandt Objektservice, ich interessiere mich für Ihre Leistungen und hätte gerne ein Angebot.",
  email: "hildebrandt.kontakt@gmail.com"
};

/* ---- Kontaktdaten in die Seite einsetzen ---- */
(function applyKontakt() {
  const waHref = `https://wa.me/${KONTAKT.whatsapp}?text=${encodeURIComponent(KONTAKT.whatsappText)}`;
  const telHref = `tel:+${KONTAKT.telefon}`;

  document.querySelectorAll('[data-wa]').forEach(el => { el.href = waHref; });
  document.querySelectorAll('[data-tel]').forEach(el => { el.href = telHref; });
  document.querySelectorAll('[data-tel-text]').forEach(el => { el.textContent = KONTAKT.telefonAnzeige; });
  document.querySelectorAll('[data-mail]').forEach(el => {
    el.href = `mailto:${KONTAKT.email}`;
    if (el.hasAttribute('data-mail-text')) el.textContent = KONTAKT.email;
  });
})();

/* ---- Mobile Navigation ---- */
(function mobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
})();

/* ---- Aktuelles Jahr im Footer ---- */
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* ---- Sanfte Einblend-Animationen ---- */
(function reveal() {
  document.documentElement.classList.add('js');
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
})();

/* ---- Kontaktformular ----
   Echte Formular-Funktion über Netlify Forms (funktioniert automatisch,
   sobald die Seite bei Netlify gehostet wird – kostenlos, kein Backend nötig).
   Die Anfrage wird an Netlify gesendet und dort per E-Mail-Benachrichtigung
   an KONTAKT.email weitergeleitet (in den Netlify-Einstellungen einrichten).
   Falls die Seite NICHT bei Netlify läuft, greift automatisch ein
   E-Mail-Fallback (mailto), damit keine Anfrage verloren geht. */
(function contactForm() {
  const form = document.getElementById('kontaktform');
  if (!form) return;

  const ok = form.querySelector('.form__ok');
  const submitBtn = form.querySelector('[type="submit"]');

  function mailtoFallback(data) {
    const body =
`Name: ${data.get('name') || ''}
Telefon: ${data.get('telefon') || ''}
Ort: ${data.get('ort') || ''}
Gewünschte Leistung: ${data.get('leistung') || ''}

Nachricht:
${data.get('nachricht') || ''}`;
    const subject = `Anfrage über die Webseite${data.get('leistung') ? ' – ' + data.get('leistung') : ''}`;
    window.location.href =
      `mailto:${KONTAKT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function showSuccess() {
    if (ok) { ok.style.display = 'block'; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    form.reset();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Wird gesendet …'; }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      if (res.ok) { showSuccess(); }
      else { mailtoFallback(data); }
    } catch (err) {
      // Netlify nicht verfügbar (z. B. lokal oder anderer Host) → E-Mail-Fallback
      mailtoFallback(data);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Anfrage absenden'; }
    }
  });
})();
