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
  email: "hildebrandt.kontakt@gmail.com",

  // ► Kontaktformular: kostenloser Access-Key von https://web3forms.com
  //   (einfach E-Mail-Adresse eintragen, Key kommt sofort per Mail – kein Konto nötig).
  //   Solange hier der Platzhalter steht, öffnet das Formular ersatzweise das
  //   E-Mail-Programm (mailto). Mit gültigem Key wird die Anfrage automatisch
  //   an KONTAKT.email gesendet – funktioniert auf Vercel und jedem Host.
  web3formsKey: "DEIN-WEB3FORMS-ACCESS-KEY"
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
   Echte Formular-Funktion über Web3Forms (https://web3forms.com) – kostenlos,
   ohne eigenen Server, funktioniert auf Vercel und jedem anderen Host. Die
   Anfrage wird direkt aus dem Browser des Besuchers an Web3Forms gesendet und
   von dort per E-Mail an KONTAKT.email zugestellt.
   Ist kein gültiger Access-Key hinterlegt, greift automatisch ein
   E-Mail-Fallback (mailto), damit keine Anfrage verloren geht. */
(function contactForm() {
  const form = document.getElementById('kontaktform');
  if (!form) return;

  const ok = form.querySelector('.form__ok');
  const submitBtn = form.querySelector('[type="submit"]');
  const keyReady = KONTAKT.web3formsKey && !/DEIN-/.test(KONTAKT.web3formsKey);

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

    // Honeypot: von Bots ausgefüllt → still verwerfen
    if (data.get('botcheck')) return;

    if (!keyReady) { mailtoFallback(data); return; }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Wird gesendet …'; }
    const payload = {
      access_key: KONTAKT.web3formsKey,
      subject: `Anfrage über die Webseite${data.get('leistung') ? ' – ' + data.get('leistung') : ''}`,
      from_name: 'Webseite Hildebrandt Objektservice',
      name: data.get('name') || '',
      telefon: data.get('telefon') || '',
      ort: data.get('ort') || '',
      leistung: data.get('leistung') || '',
      nachricht: data.get('nachricht') || ''
    };
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.success) { showSuccess(); }
      else { mailtoFallback(data); }
    } catch (err) {
      mailtoFallback(data);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Anfrage absenden'; }
    }
  });
})();
