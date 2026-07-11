/* =========================================================
   Hildebrandt Objektservice — main.js
   ---------------------------------------------------------
   ► HIER die echten Kontaktdaten eintragen, sobald vorhanden.
     Diese Werte füllen automatisch alle Telefon- und
     WhatsApp-Buttons auf der gesamten Webseite.
   ========================================================= */
const KONTAKT = {
  // Telefonnummer im internationalen Format, NUR Ziffern (für tel:-Link)
  telefon: "49XXXXXXXXXX",          // TODO: z. B. "4915123456789"
  // Anzeige-Telefonnummer (so wie sie der Besucher sehen soll)
  telefonAnzeige: "+49 (0) XXX XXXXXXX",   // TODO: z. B. "+49 (0) 2103 123456"
  // WhatsApp-Nummer, NUR Ziffern, mit Ländervorwahl ohne + oder 00
  whatsapp: "49XXXXXXXXXX",         // TODO: z. B. "4915123456789"
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

/* ---- Kontaktformular: ohne Backend per E-Mail (mailto) ---- */
/* Hinweis: Für automatischen Versand ohne E-Mail-Programm kann später
   ein Formular-Dienst (z. B. Netlify Forms, Formspree) eingebunden werden. */
(function contactForm() {
  const form = document.getElementById('kontaktform');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const tel = (data.get('telefon') || '').toString().trim();
    const leistung = (data.get('leistung') || '').toString().trim();
    const ort = (data.get('ort') || '').toString().trim();
    const nachricht = (data.get('nachricht') || '').toString().trim();

    const body =
`Name: ${name}
Telefon: ${tel}
Ort: ${ort}
Gewünschte Leistung: ${leistung}

Nachricht:
${nachricht}`;

    const subject = `Anfrage über die Webseite${leistung ? ' – ' + leistung : ''}`;
    window.location.href =
      `mailto:${KONTAKT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const ok = form.querySelector('.form__ok');
    if (ok) ok.style.display = 'block';
  });
})();
