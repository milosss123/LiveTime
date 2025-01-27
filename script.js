// Pomoćna funkcija za prikazivanje vremena u odabranoj vremenskoj zoni
function prikaziVreme(zona) {
  const sada = new Date();
  
  // Koristimo Intl.DateTimeFormat da konvertujemo vreme u željenu vremensku zonu
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,  // 24-časovni format
    timeZone: zona
  });

  const vreme = formatter.format(sada);
  
  const [sati, minuti, sekundi] = vreme.split(':');
  
  // Ažuriranje vremena na ekranu
  document.getElementById("sat").textContent = sati.padStart(2, "0");
  document.getElementById("minut").textContent = minuti.padStart(2, "0");
  document.getElementById("sekund").textContent = sekundi.padStart(2, "0");
  
  // Ažuriranje datuma
  let dan = String(sada.getDate()).padStart(2, "0");
  let mesec = String(sada.getMonth() + 1).padStart(2, "0");
  let godina = sada.getFullYear();
  document.getElementById("datum").textContent = `${dan}.${mesec}.${godina}`;
}

// Funkcija za prebacivanje na tamnu temu
document.getElementById("tamna-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "zelena-tema", "plava-tema", "crvena-tema");
  document.body.classList.add("tamna-tema");
});

// Funkcija za prebacivanje na svetlu temu
document.getElementById("svetla-tema").addEventListener("click", () => {
  document.body.classList.remove("tamna-tema", "zelena-tema", "plava-tema", "crvena-tema");
  document.body.classList.add("svetla-tema");
});

// Funkcija za promenu boje na zelenu
document.getElementById("zelena-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "plava-tema", "crvena-tema");
  document.body.classList.add("zelena-tema");
});

// Funkcija za promenu boje na plavu
document.getElementById("plava-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "zelena-tema", "crvena-tema");
  document.body.classList.add("plava-tema");
});

// Funkcija za promenu boje na crvenu
document.getElementById("crvena-tema").addEventListener("click", () => {
  document.body.classList.remove("svetla-tema", "tamna-tema", "zelena-tema", "plava-tema");
  document.body.classList.add("crvena-tema");
});

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
