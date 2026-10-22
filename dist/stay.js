const stayForm = document.querySelector('#stay-form');
const arrival = document.querySelector('#stay-checkin');
const departure = document.querySelector('#stay-checkout');
const room = document.querySelector('#stay-apartment');
const adults = document.querySelector('#stay-adults');
const children = document.querySelector('#stay-children');
const agesContainer = document.querySelector('#child-ages');
const summary = document.querySelector('#stay-summary');
const actions = document.querySelector('#stay-actions');
const emailLink = document.querySelector('#stay-email');
const chatLink = document.querySelector('#stay-whatsapp');
const welcomeMessage = 'Buna ziua! As dori sa planific un sejur in Poiana Brasov la Massif Grand Chalet Apartments';
const localDay = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dateLabel = new Intl.DateTimeFormat('ro-RO',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
function nextDate(value) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate()+1);
  return date.toISOString().slice(0,10);
}
arrival.min = localDay;
departure.min = nextDate(localDay);

function validateStay() {
  departure.setCustomValidity('');
  departure.min = nextDate(arrival.value || localDay);
  if (arrival.value && departure.value && departure.value <= arrival.value) {
    departure.setCustomValidity('Alege o dată de plecare după data sosirii.');
  }
  children.setCustomValidity(Number(adults.value)+Number(children.value)>4
    ? 'Un apartament găzduiește cel mult 4 persoane. Pentru un grup mai mare, contactează-ne direct.' : '');
}
function invalidateSummary() {
  validateStay();
  if (!actions.hidden) {
    actions.hidden = true;
    emailLink.removeAttribute('href');
    chatLink.removeAttribute('href');
    summary.replaceChildren();
    const note = document.createElement('p');
    note.textContent = 'Ai modificat detaliile. Apasă „Pregătește sejurul” pentru a actualiza cererea.';
    summary.append(note);
  }
}
function renderChildAges() {
  const saved = [...agesContainer.querySelectorAll('input')].map(input=>input.value);
  agesContainer.replaceChildren();
  const count = Number(children.value);
  agesContainer.hidden = count === 0;
  for (let index=0; index<count; index++) {
    const label = document.createElement('label');
    label.htmlFor = `child-age-${index}`;
    label.textContent = `Vârsta copilului ${index+1}`;
    const input = document.createElement('input');
    input.id = label.htmlFor;
    input.name = `childAge${index+1}`;
    input.type = 'number'; input.min = '0'; input.max = '17'; input.required = true;
    input.placeholder = '0–17 ani'; input.value = saved[index] || '';
    label.append(input); agesContainer.append(label);
  }
}
children.addEventListener('change',renderChildAges);
stayForm.addEventListener('input',invalidateSummary);
stayForm.addEventListener('change',invalidateSummary);
stayForm.addEventListener('submit', event=> {
  event.preventDefault();
  validateStay();
  if (!stayForm.reportValidity()) return;
  const nights = Math.round((new Date(`${departure.value}T12:00:00Z`)-new Date(`${arrival.value}T12:00:00Z`))/86400000);
  const arrivalLabel = dateLabel.format(new Date(`${arrival.value}T12:00:00Z`));
  const departureLabel = dateLabel.format(new Date(`${departure.value}T12:00:00Z`));
  const apartmentLabel = room.selectedOptions[0].textContent;
  const ages = [...agesContainer.querySelectorAll('input')].map(input=>input.value);
  const guestLabel = `${adults.value} ${Number(adults.value)===1?'adult':'adulți'}${Number(children.value)>0?`, ${children.value} ${Number(children.value)===1?'copil':'copii'} (${ages.join(', ')} ani)`:''}`;
  summary.replaceChildren();
  const heading = document.createElement('h4');
  heading.textContent = 'Cererea ta'; heading.tabIndex = -1;
  const list = document.createElement('dl');
  [['Perioadă',`${arrivalLabel} – ${departureLabel}`],['Durată',`${nights} ${nights===1?'noapte':'nopți'}`],['Apartament',apartmentLabel],['Oaspeți',guestLabel],['Tarif direct','Ofertă la cerere · avantaj de 10%']].forEach(([label,value])=> {
    const row = document.createElement('div');
    const term = document.createElement('dt'); term.textContent = label;
    const description = document.createElement('dd'); description.textContent = value;
    row.append(term,description); list.append(row);
  });
  summary.append(heading,list);
  const request = `${welcomeMessage}\n\nSosire: ${arrivalLabel}\nPlecare: ${departureLabel}\nDurata: ${nights} ${nights===1?'noapte':'nopti'}\nApartament: ${apartmentLabel}\nOaspeti: ${guestLabel}\n\nVa rog sa imi confirmati disponibilitatea si oferta directa cu 10% mai mica fata de tariful Booking, pentru aceleasi conditii.`;
  emailLink.href = `mailto:massifapartgrandchalet@gmail.com?subject=${encodeURIComponent('Cerere sejur Massif · '+arrival.value+' – '+departure.value)}&body=${encodeURIComponent(request)}`;
  chatLink.href = `https://wa.me/40745177080?text=${encodeURIComponent(request)}`;
  actions.hidden = false;
  heading.focus({preventScroll:true});
  summary.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
});
