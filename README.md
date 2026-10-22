# Massif Grand Chalet Apartments

Site de prezentare în limba română pentru cele patru apartamente din Poiana Brașov: **Hidden Ray, Hidden Crest, Hidden Forest și Hidden Nest**.

Adresă: [massifapartments.vercel.app](https://massifapartments.vercel.app/).

Site static, fără dependențe de instalat. Include prezentări individuale, galerie filtrabilă cu navigare din tastatură, meniu mobil, întrebări frecvente, localizare și formular de planificare direct pe site (sosire, plecare, apartament, adulți, copii și vârste). Formularul calculează durata și pregătește o cerere prin e-mail sau WhatsApp. O pictogramă WhatsApp fixă oferă acces rapid la contact. Cererile sunt confirmate manual de gazdă; nu sunt rezervări automate.

## Dezvoltare locală

Necesită Node.js. Din directorul proiectului:

```sh
node server.mjs
```

Deschide `http://127.0.0.1:4173`. Verificarea sintaxei:

```sh
node --check dist/app.js
```

## Publicare

Proiect Vercel separat: `massif-grand-chalet-apartments`. Framework: Other / static. Director publicat: `dist`. Nu sunt necesare variabile de mediu, baze de date sau chei API. `vercel.json` conține configurația de găzduire.

## Conținut și fotografii

- [Booking.com — proprietatea](https://www.booking.com/hotel/ro/hidden-crest.html): cele patru unități cu un dormitor, capacitate de până la 4 adulți, dotări comune, adresă, politici și fotografii Hidden Crest / Hidden Nest.
- [Travelminit — proprietatea](https://travelminit.ro/massif-grand-chalet-apartments-poiana-brasov): fotografii etichetate explicit Hidden Ray și Hidden Forest, date de contact publice.
- Identificarea vizuală a celor patru apartamente a fost confirmată cu imaginile de referință furnizate de proprietar în conversație. Hidden Ray: arcadă la pat; Hidden Crest: canapea teracotă; Hidden Forest: accente verzi și decor de pădure; Hidden Nest: dormitor auriu.
- [TikTok](https://www.tiktok.com/@massif_apartments): contul furnizat de proprietar.
- Fonturi Manrope și Cormorant Garamond, distribuite sub SIL Open Font License, servite local. Licențele sunt în `licenses/`.

Nu sunt publicate tarife, distanțe până la pârtii sau scoruri de evaluare care pot deveni inexacte. Oferta directă este anunțată cu 10% sub tariful Booking pentru aceleași condiții, conform instrucțiunii proprietarului. Nu există încă o conexiune API autorizată pentru tarife și disponibilitate, deci site-ul nu afișează sume sau stocuri neverificate. Disponibilitatea, prețul final și condițiile rezervării se confirmă cu gazda. Vezi `INTEGRATION.md` pentru ce rămâne de conectat.

Fotografiile sunt utilizate pentru site-ul proprietarului, conform solicitării acestuia. Nu există instrumente de analiză, publicitate, cookie-uri proprii, plăți sau colectare de date prin formulare interne.

## Organizare

- `dist/index.html`: structură, metadate și conținut.
- `dist/style.css`: design și adaptare mobilă.
- `dist/app.js`: apartamente, galerii și dialoguri.
- `dist/stay.js`: validarea sejurului, rezumatul și cererile prin e-mail / WhatsApp.
- `dist/assets/`: fotografii și fonturi locale.

Acest repository și proiectul Vercel sunt independente de celelalte proiecte ale contului.
