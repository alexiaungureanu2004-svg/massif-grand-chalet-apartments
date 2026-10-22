# Sincronizare Booking: lucrări rămase

## Stare reală

Formularul de pe site pregătește cereri directe, cu perioada și oaspeții selectați. Nu efectuează rezervări, nu modifică inventarul și nu preia încă tarife sau disponibilitate live. Reducerea de 10% este politica comercială solicitată de proprietar; o sumă calculată nu este afișată în lipsa unei surse de preț confirmate.

Proprietarul gestionează momentan tarifele și calendarul direct în Booking Extranet. Proiectul Vercel nu are credențiale de integrare configurate. Nu există chei API în frontend sau în acest repository.

## Conexiunea necesară

- Booking Connectivity API necesită acces de partener de conectivitate și autorizarea proprietății: https://developers.booking.com/connectivity/docs
- Booking Demand API necesită înregistrare ca Managed Affiliate Partner, API token și Affiliate ID; nu este implicit inclus în contul de cazare: https://developers.booking.com/demand/docs/getting-started/prerequisites
- Un channel manager compatibil poate centraliza calendarul și tarifele, oferind un motor de rezervări pe site. Exemple verificate: https://beds24.com/ și https://www.smoobu.com/en/channel-manager-booking-com/

Furnizorul și abonamentul trebuie alese împreună cu proprietarul înainte de conectare. Niciun cont nou sau abonament nu a fost creat. Conectarea poate schimba panoul în care se administrează tarifele și disponibilitatea; acest lucru trebuie stabilit înainte de activare.

## Pași după alegerea furnizorului

1. Conectarea proprietății Booking 13320837 la furnizorul ales, cu autorizarea proprietarului.
2. Maparea verificată a celor patru apartamente la identificatorii reali de cameră. Denumirile publice sunt generice în Booking, deci nu se presupune ordinea lor.
3. Definirea tarifului de comparație: aceleași date, ocupanți, apartament, condiții de anulare, taxe și monedă. Tarifele Genius/mobile și promoțiile pot diferi de tariful public standard.
4. Calcularea tarifului direct din baza de comparație verificată: 90% din valoare, rotunjit în unitățile monetare minore. Stocul indisponibil sau erorile furnizorului nu se tratează drept disponibilitate confirmată.
5. Integrarea server-side ori a motorului de rezervări al furnizorului. Credențialele se configurează exclusiv ca secrete în proiectul Vercel Massif.
6. Înainte de rezervări automate, reverificarea prețului și stocului, crearea confirmării și actualizarea inventarului comun pentru a evita rezervări suprapuse.
7. Verificare cu date reale înainte de afișarea publică a prețurilor live. Până atunci, cererile rămân cu confirmare manuală.

## Constrângere nouă: fără abonament lunar

Proprietarul a ales explicit o soluție fără cost lunar. Nu se creează abonamente de channel manager.

O conexiune gratuită de calendar se poate analiza prin exporturile iCal ale celor patru unități, dacă opțiunea este disponibilă în Booking Extranet. Feedurile de calendar nu înlocuiesc o sursă de tarife. Trebuie obținute și verificate exporturile reale și regulile de tarif înainte de implementarea sincronizării. Nu există în prezent exporturi furnizate sau tarife de bază confirmate.

Următorul pas este verificarea opțiunii Calendar → Sincronizare calendare → Export în Extranet. Nu se presupune că lipsa unui eveniment iCal garantează că o cameră este vandabilă: restricțiile, închiderile și intervalul acoperit trebuie validate. Confirmarea manuală rămâne necesară până la o sursă verificată de stoc și preț.

Documentație de implementator pentru iCal și Booking: https://documentation.maestrel.com/knowledgebase/how-to-sync-hbook-with-booking-com
