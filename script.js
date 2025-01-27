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
  document.getElementById("am-pm").textContent = amPm;  // Prikazivanje samo AM ili PM
  
  // Ažuriranje datuma
  let dan = String(sada.getDate()).padStart(2, "0");
  let mesec = String(sada.getMonth() + 1).padStart(2, "0");
  let godina = sada.getFullYear();
  document.getElementById("datum").textContent = `${dan}.${mesec}.${godina}`;
}

// Funkcija za prebacivanje teme
function prebacivanjeTeme() {
  // Ako je trenutno svetla tema, prebacujemo na tamnu i obratno
  if (document.body.classList.contains("svetla-tema")) {
    document.body.classList.remove("svetla-tema");
    document.body.classList.add("tamna-tema");
  } else {
    document.body.classList.remove("tamna-tema");
    document.body.classList.add("svetla-tema");
  }
}

// Dodavanje događaja za dugme koje prebacuje teme
document.getElementById("prebaci-temu").addEventListener("click", prebacivanjeTeme);

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

// Promena tema dugmadi
document.getElementById("zelena-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "plava-tema", "crvena-tema");
  document.body.classList.add("zelena-tema");
});

document.getElementById("plava-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "zelena-tema", "crvena-tema");
  document.body.classList.add("plava-tema");
});

document.getElementById("crvena-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "zelena-tema", "plava-tema");
  document.body.classList.add("crvena-tema");
});
