# Hildebrandt Objektservice – Webseite

Statische Webseite (HTML / CSS / JavaScript) für **Hildebrandt Objektservice**.
Kein Build-Prozess, keine Abhängigkeiten – einfach die Dateien auf einen
Webspace laden oder bei Netlify / GitHub Pages veröffentlichen.

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, Leistungen, Ablauf, Einsatzgebiet, FAQ) |
| `leistungen.html` | Detailseite Leistungen (Garten, Objekt, Entrümpelung) |
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

## Deployment auf Vercel
Die Seite ist eine statische Website und läuft ohne Konfiguration auf Vercel.

**Empfohlen: GitHub-Integration (automatisches Deployment bei jedem Push)**
1. Auf [vercel.com](https://vercel.com) mit dem GitHub-Konto anmelden.
2. **Add New… → Project** → Repository `website-1` importieren.
3. Framework Preset: **Other** / Output-Verzeichnis: **`/`** (Root) – „Deploy" klicken.
4. Fertig: Jeder Push auf den Branch deployt automatisch eine neue Version.

**Alternative: Vercel CLI (vom eigenen Rechner)**
```bash
npm i -g vercel
vercel          # Vorschau-Deployment
vercel --prod   # Produktions-Deployment
```
Die Datei `vercel.json` setzt bereits sinnvolle Sicherheits-Header und Caching.

## Kontaktformular (echte Funktion, host-unabhängig)
Das Formular nutzt **Web3Forms** – kostenlos, ohne eigenen Server, funktioniert auf
Vercel und jedem anderen Host. Einrichtung (einmalig, ~1 Minute):

1. Auf [web3forms.com](https://web3forms.com) die E-Mail-Adresse
   `hildebrandt.kontakt@gmail.com` eintragen → der **Access Key** kommt sofort per Mail
   (kein Konto/Passwort nötig).
2. In **`js/main.js`** den Wert `web3formsKey: "DEIN-WEB3FORMS-ACCESS-KEY"` durch den
   echten Key ersetzen.
3. Committen/pushen – ab dann landet jede Anfrage automatisch im Postfach.

Solange kein gültiger Key hinterlegt ist, öffnet das Formular ersatzweise das
E-Mail-Programm des Besuchers (mailto-Fallback), damit keine Anfrage verloren geht.

## Noch offen
- **Logo:** Aktuell wird ein sauberes Navy/Grün-Zeichen mit Schriftzug verwendet.
  Das Original-Logo (PNG) kann in `assets/` abgelegt und im Header (`class="brand"`)
  eingebunden werden.
- **Fotos:** Die Bildflächen sind stilvolle SVG-Illustrationen als Platzhalter.
  Eigene Fotos (Vorher/Nachher, Garten, Objekte) wirken deutlich vertrauensvoller
  und können in `assets/` abgelegt und eingebunden werden.
- **Impressum:** USt-IdNr. ergänzen, falls vorhanden; Hinweiskasten entfernen.

## SEO – was umgesetzt wurde
Die Seite ist umfassend für **lokales Service-SEO** optimiert:

- **Strukturierte Daten (Schema.org / JSON-LD):** `LocalBusiness` (HomeAndConstructionBusiness
  inkl. Adresse, Geo-Koordinaten, Einsatzgebiet, Leistungen), `FAQPage`, `Service`
  und `BreadcrumbList` → Chance auf Rich Results bei Google.
- **Optimierte Title-Tags & Meta-Descriptions** mit lokalen Keywords (Objektservice,
  Gartenpflege, Hausmeisterservice, Entrümpelung + Städtenamen).
- **Keyword-reicher lokaler Textblock** auf der Startseite.
- **Open Graph & Twitter Cards** inkl. Vorschaubild (`assets/og-image.png`) für Social Media.
- **Geo-Meta-Tags**, `canonical`-URLs, `robots.txt`, `sitemap.xml`, `site.webmanifest`.
- **Saubere Semantik:** genau eine H1 pro Seite, sinnvolle Überschriften, interne Verlinkung.
- **Schnelle Ladezeit:** statische Seite, keine externen Ressourcen, SVG-Grafiken.

### ⚠️ Wichtig: Domain eintragen
In allen SEO-Angaben ist die Platzhalter-Domain **`https://www.hildebrandt-objektservice.de`**
hinterlegt. Sobald die echte Domain feststeht, per Suchen & Ersetzen in allen Dateien
(HTML, `robots.txt`, `sitemap.xml`) austauschen.

### 🚀 Nach dem Livegang – die wichtigsten SEO-Schritte
1. **Google Unternehmensprofil (Google Business Profile) anlegen** – der mit Abstand
   wichtigste Faktor für lokale Sichtbarkeit. Adresse, Telefon, Leistungen, Fotos und
   Öffnungszeiten identisch zur Website eintragen und verifizieren.
2. **Google Search Console** einrichten und `sitemap.xml` einreichen.
3. **Bing Webmaster Tools** ebenfalls (Sitemap einreichen).
4. **Kundenbewertungen** auf Google sammeln – starker lokaler Ranking- und Vertrauensfaktor.
5. **Branchenverzeichnisse** mit identischen Daten (NAP): Das Örtliche, Gelbe Seiten,
   11880, wlw, Yelp – sorgt für konsistente Signale.
6. **Echte Fotos** eurer Arbeiten ergänzen (Bild-SEO + Vertrauen).
7. Optional: Für jede Stadt eine eigene Unterseite (z. B. „Gartenpflege Solingen") für
   noch mehr lokale Reichweite.

## Lokal ansehen
```bash
python3 -m http.server 8000
# dann http://localhost:8000 aufrufen
```
