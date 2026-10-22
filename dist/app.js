const apartments = [
  { id:'ray', name:'Hidden Ray', mood:'LUMINĂ & TEXTURI CALDE',
    description:'Accente aurii, tonuri naturale și o arcadă decorativă care dă dormitorului un farmec aparte. Locul tău pentru dimineți tihnite.',
    photos:[['40509942.webp','Dormitor cu arcadă decorativă'],['40509938.webp','Living în tonuri calde'],['40509934.webp','Bucătărie cu insulă'],['40509940.webp','Detaliu din dormitor'],['40509935.webp','Living și zonă de luat masa'],['40509939.webp','Detalii de interior']] },
  { id:'crest', name:'Hidden Crest', mood:'TONURI PĂMÂNTII & CONFORT',
    description:'O canapea teracotă, lemn cald și lumină discretă. Un interior cu personalitate, în care serile se așază firesc.',
    photos:[['629708834.jpg','Living cu canapea teracotă'],['629708822.jpg','Dormitor cu lumină ambientală'],['629708705.jpg','Living și fotoliu'],['629708850.jpg','Dormitor și fereastră']] },
  { id:'forest', name:'Hidden Forest', mood:'INSPIRAT DE NATURĂ',
    description:'Accente de verde și un decor de pădure în dormitor. O atmosferă liniștită, pentru momente în care vrei să încetinești.',
    photos:[['40512703.webp','Dormitor cu decor inspirat de pădure'],['40512702.webp','Dormitor și accente verzi'],['40512700.webp','Pat matrimonial și lumină caldă'],['40512701.webp','Detalii din dormitor']] },
  { id:'nest', name:'Hidden Nest', mood:'UN CUIB DE LINIȘTE',
    description:'Nuanțe de miere, lumină aurie și texturi care îmbie la odihnă. Un refugiu primitor pentru timpul petrecut împreună.',
    photos:[['629887726.jpg','Dormitor în tonuri aurii'],['629887685.jpg','Living și bucătărie deschisă'],['629887694.jpg','Zonă de luat masa'],['629887728.jpg','Lumină caldă în dormitor'],['629887689.jpg','Bucătărie echipată']] }
];

const apartmentGrid = document.querySelector('#apartment-grid');
apartments.forEach((apartment,index) => {
  const article = document.createElement('article');
  article.className = 'apartment-card';
  article.innerHTML = `<button class="card-photo" data-apartment="${apartment.id}" aria-label="Descoperă ${apartment.name}"><img src="/assets/${apartment.photos[0][0]}" alt="${apartment.name} — ${apartment.photos[0][1]}" loading="lazy" width="1200" height="1600"><span class="card-number">0${index+1}</span><span class="card-badge">${apartment.mood}</span></button><div class="card-title-row"><h3>${apartment.name}</h3><button data-apartment="${apartment.id}" aria-label="Detalii ${apartment.name}">↗</button></div><p>${apartment.description}</p><div class="card-meta"><span>Până la 4 adulți</span><span>1 dormitor + living</span><span>Bucătărie</span></div>`;
  apartmentGrid.append(article);
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigare');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Deschide meniul'); nav.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
  nav.classList.toggle('is-open',open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

// Interleave the collection so all four apartments appear in the first gallery view.
const allPhotos = [];
for (let i=0; i<Math.max(...apartments.map(a=>a.photos.length)); i++) {
  apartments.forEach(apartment => {
    if (apartment.photos[i]) allPhotos.push({apartment:apartment.id,name:apartment.name,file:apartment.photos[i][0],label:apartment.photos[i][1]});
  });
}
let filter = 'all';
let galleryLimit = 8;
const galleryGrid = document.querySelector('#gallery-grid');
const loadMore = document.querySelector('#load-more');
function filteredPhotos() { return allPhotos.filter(photo => filter === 'all' || photo.apartment === filter); }
function renderGallery() {
  const photos = filteredPhotos();
  galleryGrid.replaceChildren();
  photos.slice(0,galleryLimit).forEach(photo => {
    const button = document.createElement('button');
    button.className = 'gallery-item';
    button.setAttribute('aria-label',`Mărește: ${photo.name} — ${photo.label}`);
    button.innerHTML = `<img src="/assets/${photo.file}" alt="${photo.name} — ${photo.label}" loading="lazy" width="600" height="800"><span>${photo.name} ↗</span>`;
    button.addEventListener('click',()=>openLightbox(photos,photos.indexOf(photo)));
    galleryGrid.append(button);
  });
  loadMore.hidden = photos.length <= galleryLimit;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',()=> {
  filter = button.dataset.filter; galleryLimit = 8;
  document.querySelectorAll('[data-filter]').forEach(item=> {const active = item === button; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active));});
  renderGallery();
}));
loadMore.addEventListener('click',()=>{galleryLimit += 8;renderGallery();});
renderGallery();

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activePhotos = [];
let photoIndex = 0;
function showPhoto() {
  const photo = activePhotos[photoIndex];
  lightboxImage.src = `/assets/${photo.file}`;
  lightboxImage.alt = `${photo.name} — ${photo.label}`;
  lightboxCaption.textContent = `${photo.name} · ${photo.label} — ${photoIndex+1} / ${activePhotos.length}`;
}
function openLightbox(photos,index=0) { activePhotos = photos; photoIndex = index; showPhoto(); lightbox.showModal(); }
function stepPhoto(step) { photoIndex = (photoIndex + step + activePhotos.length) % activePhotos.length; showPhoto(); }
document.querySelector('#lightbox-close').addEventListener('click',()=>lightbox.close());
document.querySelector('#lightbox-prev').addEventListener('click',()=>stepPhoto(-1));
document.querySelector('#lightbox-next').addEventListener('click',()=>stepPhoto(1));
lightbox.addEventListener('keydown',event=> {
  if (event.key === 'ArrowLeft') {event.preventDefault();stepPhoto(-1);}
  if (event.key === 'ArrowRight') {event.preventDefault();stepPhoto(1);}
});

const detailDialog = document.querySelector('#apartment-dialog');
const detailContent = document.querySelector('#detail-content');
document.querySelectorAll('[data-apartment]').forEach(button=>button.addEventListener('click',()=> {
  const apartment = apartments.find(a=>a.id === button.dataset.apartment);
  const photos = allPhotos.filter(photo=>photo.apartment === apartment.id);
  detailContent.innerHTML = `<div class="detail-layout"><div class="detail-cover"><img src="/assets/${apartment.photos[0][0]}" alt="${apartment.name} — ${apartment.photos[0][1]}"></div><div class="detail-copy"><p class="eyebrow">${apartment.mood}</p><h2 id="detail-title">${apartment.name}</h2><p>${apartment.description}</p><div class="detail-facts"><span>Până la 4 adulți</span><span>Pat matrimonial</span><span>Living cu canapea extensibilă</span><span>Bucătărie proprie</span><span>Baie proprie</span><span>Balcon / terasă</span></div><a class="button" href="#rezervare" data-plan-apartment="${apartment.id}">Planifică acest sejur <span aria-hidden="true">↗</span></a><a class="text-link" href="mailto:massifapartgrandchalet@gmail.com?subject=${encodeURIComponent('Sejur la '+apartment.name)}">Întreabă prin e-mail <span aria-hidden="true">↗</span></a><div class="detail-thumbs">${photos.slice(0,4).map((photo,index)=>`<button data-detail-photo="${index}" aria-label="Mărește ${photo.label}"><img src="/assets/${photo.file}" alt="${photo.label}"></button>`).join('')}</div></div></div>`;
  detailContent.querySelector('[data-plan-apartment]').addEventListener('click',()=> {
    const select = document.querySelector('#stay-apartment');
    select.value = apartment.id;
    select.dispatchEvent(new Event('change',{bubbles:true}));
    detailDialog.close();
  });
  detailContent.querySelectorAll('[data-detail-photo]').forEach(thumb=>thumb.addEventListener('click',()=>openLightbox(photos,Number(thumb.dataset.detailPhoto))));
  detailDialog.showModal();
}));
document.querySelector('#detail-close').addEventListener('click',()=>detailDialog.close());
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target === dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}}));

document.querySelector('#year').textContent = new Date().getFullYear();
const privacyDialog = document.querySelector('#privacy-dialog');
document.querySelector('#privacy-open').addEventListener('click',()=>privacyDialog.showModal());
document.querySelector('#privacy-close').addEventListener('click',()=>privacyDialog.close());
