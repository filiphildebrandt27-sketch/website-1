# Hildebrandt Objektservice – Webseite

Statische Webseite (HTML / CSS / JavaScript) für **Hildebrandt Objektservice**.
Kein Build-Prozess, keine Abhängigkeiten – einfach die Dateien auf einen
Webspace laden oder bei Netlify / GitHub Pages veröffentlichen.

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, Leistungen, Ablauf, Einsatzgebiet, FAQ) |
| `leistungen.html` | Detailseite Leistungen (Garten, Objekt, Entrümpelung, Elektro) |
| `kontakt.html` | Kontakt + echtes Anfrageformular |
| `impressum.html` | Impressum (Anschrift eingetragen – USt-IdNr. ggf. ergänzen) |
| `datenschutz.html` | Datenschutzerklärung (Muster – bitte prüfen) |

## Eingetragene Daten
- **Telefon & WhatsApp:** +49 179 7313486
- **Anschrift:** Köbener Str. 21, 40721 Hilden
- **Anfragen / E-Mail:** hildebrandt.kontakt@gmail.com
- **Farben:** Navy `#1f2c44` + Grün `#63a23c` (nach Logo)

Kontaktdaten sind zentral in **`js/main.js`** (Objekt `KONTAKT`) hinterlegt und
füllen automatisch alle Telefon-/WhatsApp-Buttons der ganzen Seite.

## Kontaktformular (echte Funktion)
Das Formular nutzt **Netlify Forms** – es funktioniert **automatisch**, sobald die
Seite bei Netlify gehostet wird (kostenlos, kein eigener Server nötig):

1. Seite bei [netlify.com](https://www.netlify.com) veröffentlichen (Repo verbinden
   oder Ordner per Drag & Drop hochladen).
2. Im Netlify-Dashboard unter **Forms** erscheint das Formular „kontakt".
3. Dort unter **Form notifications → Add notification → Email notification** die
   Adresse `hildebrandt.kontakt@gmail.com` eintragen – dann landet jede Anfrage
   direkt im Postfach.

Läuft die Seite **nicht** bei Netlify, greift automatisch ein E-Mail-Fallback
(das E-Mail-Programm des Besuchers öffnet sich mit der vorausgefüllten Anfrage),
damit keine Anfrage verloren geht.
*Alternative Dienste (funktionieren auf jedem Host): Formspree oder Web3Forms –
dafür in `js/main.js` die `fetch('/')`-Zeile auf den jeweiligen Endpoint ändern.*

## Noch offen
- **Logo:** Aktuell wird ein sauberes Navy/Grün-Zeichen mit Schriftzug verwendet.
  Das Original-Logo (PNG) kann in `assets/` abgelegt und im Header (`class="brand"`)
  eingebunden werden.
- **Fotos:** Die Bildflächen sind stilvolle SVG-Illustrationen als Platzhalter.
  Eigene Fotos (Vorher/Nachher, Garten, Objekte) wirken deutlich vertrauensvoller
  und können in `assets/` abgelegt und eingebunden werden.
- **Impressum:** USt-IdNr. ergänzen, falls vorhanden; Hinweiskasten entfernen.

## Lokal ansehen
```bash
python3 -m http.server 8000
# dann http://localhost:8000 aufrufen
```
