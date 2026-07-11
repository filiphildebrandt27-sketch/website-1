# Hildebrandt Objektservice – Webseite

Statische Webseite (HTML / CSS / JavaScript) für **Hildebrandt Objektservice**.
Kein Build-Prozess, keine Abhängigkeiten – einfach die Dateien auf einen
Webspace laden oder bei Netlify / GitHub Pages hochladen.

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, Leistungen, Ablauf, Einsatzgebiet, FAQ) |
| `leistungen.html` | Detailseite Leistungen (Garten, Objekt, Entrümpelung, Elektro) |
| `kontakt.html` | Kontakt + Anfrageformular |
| `impressum.html` | Impressum (**Platzhalter – bitte ausfüllen**) |
| `datenschutz.html` | Datenschutzerklärung (**Muster – bitte prüfen**) |

## ✅ Vor der Veröffentlichung noch eintragen

### 1. Telefon & WhatsApp (wichtigste Buttons!)
Öffne **`js/main.js`** und trage oben im Objekt `KONTAKT` die echten Werte ein:

```js
const KONTAKT = {
  telefon:        "4915123456789",        // deine Telefonnummer, nur Ziffern mit Ländervorwahl
  telefonAnzeige: "+49 (0) 2103 123456",  // so wird die Nummer angezeigt
  whatsapp:       "4915123456789",        // WhatsApp-Nummer, nur Ziffern
  ...
};
```
Damit werden **alle** Telefon- und WhatsApp-Buttons auf der ganzen Seite automatisch aktiv.

### 2. Impressum & Datenschutz
In `impressum.html` und `datenschutz.html` die Platzhalter `[in eckigen Klammern]`
durch die echten Angaben ersetzen (Anschrift, USt-IdNr. falls vorhanden, Hosting-Anbieter).
Den gelben Hinweiskasten anschließend entfernen. Ein Impressum ist in Deutschland Pflicht.

### 3. Logo (optional)
Aktuell wird ein Text-Logo mit Blatt-Symbol verwendet. Ein eigenes Logo kann in
`assets/` abgelegt und im Header (`class="brand"`) eingebunden werden.

### 4. Fotos (optional, empfohlen)
Die Bildbereiche sind aktuell SVG-Illustrationen als Platzhalter. Echte Fotos von
euren Arbeiten (Vorher/Nachher, Garten, Objekte) wirken deutlich vertrauensvoller.

## Kontaktformular
Das Formular öffnet beim Absenden das E-Mail-Programm des Besuchers (mailto) mit
vorausgefüllter Anfrage an `hildebrandt.kontakt@gmail.com`. Für automatischen Versand
ohne E-Mail-Programm kann später ein Dienst wie **Netlify Forms** oder **Formspree**
eingebunden werden.

## Lokal ansehen
Einfach `index.html` im Browser öffnen – oder mit einem lokalen Server:
```bash
python3 -m http.server 8000
# dann http://localhost:8000 aufrufen
```
