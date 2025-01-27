// Pomoćna funkcija za prikazivanje vremena u odabranoj vremenskoj zoni
function prikaziVreme(zona) {
  const sada = new Date();
  
  // Koristimo Intl.DateTimeFormat da konvertujemo vreme u željenu vremensku zonu
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,  // 12-časovni format sa AM/PM
    timeZone: zona
  });

  const vreme = formatter.format(sada);
  
  const [sati, minuti, sekundi] = vreme.split(':');
  const amPm = (parseInt(sati) >= 12) ? 'PM' : 'AM';
  
  // Ažuriranje vremena na ekranu
  document.getElementById("sat").textContent = sati.padStart(2, "0");
  document.getElementById("minut").textContent = minuti.padStart(2, "0");
  document.getElementById("sekund").textContent = sekundi.padStart(2, "0");
  document.getElementById("am-pm").textContent = amPm;
  
  // Ažuriranje datuma
  let dan = String(sada.getDate()).padStart(2, "0");
  let mesec = String(sada.getMonth() + 1).padStart(2, "0");
  let godina = sada.getFullYear();
  document.getElementById("datum").textContent = `${dan}.${mesec}.${godina}`;
}

// Funkcija za prebacivanje teme (svetla/tamna/zelena/plava)
function prebacivanjeTeme() {
  document.body.classList.toggle("svetla-tema");
  document.body.classList.remove("tamna-tema", "zelena-tema", "plava-tema");
}

function prebacivanjeZeleneTeme() {
  document.body.classList.toggle("zelena-tema");
  document.body.classList.remove("svetla-tema", "tamna-tema", "plava-tema");
}

function prebacivanjePlaveTeme() {
  document.body.classList.toggle("plava-tema");
  document.body.classList.remove("svetla-tema", "tamna-tema", "zelena-tema");
}

// Dodaj događaje za dugmadi koja prebacuju teme
document.getElementById("prebaci-temu").addEventListener("click", prebacivanjeTeme);
document.getElementById("prebaci-temu-zeleno").addEventListener("click", prebacivanjeZeleneTeme);
document.getElementById("prebaci-temu-plavo").addEventListener("click", prebacivanjePlaveTeme);

// Funkcija za promenu vremenske zone
document.getElementById("vremenska-zona").addEventListener("change", function() {
  trenutnaZona = this.value;  // Ažuriraj izabranu vremensku zonu
  prikaziVreme(trenutnaZona);  // Pozovi funkciju sa novom vremenskom zonom
  // Dodatno, sačuvaj poslednji odabrani grad u localStorage
  localStorage.setItem("lastTimezone", trenutnaZona);
});

// Učitaj poslednju izabranu vremensku zonu iz localStorage
let trenutnaZona = localStorage.getItem("lastTimezone") || "Europe/Belgrade";
prikaziVreme(trenutnaZona);

// Pozivaj funkciju za vreme svakih 1000 ms (1 sekunda) da osvežavaš sat
setInterval(() => prikaziVreme(trenutnaZona), 1000);
