// Test s
let btn = document.getElementById("submit");
let eingabe = [];

function ortSpeichern(e) {
  e.preventDefault();
  sessionStorage.removeItem("Ort");
  sessionStorage.clear();
  let ort = document.getElementById("ort").value;
  eingabe.push(ort);
  sessionStorage.setItem("Ort", JSON.stringify(eingabe));
  //   document.forms[0].reset();
}

btn.addEventListener("click", ortSpeichern);

console.log(eingabe);

// Hintergrund je nach Tageszeit wechseln
let Wettercontainer = document.getElementById("wettercontainer");

function hintergrundWechseln() {
  const accessKey = "ncHA1aJyS2eNi7ZowM_Gxw93tTdi-7nhhC4eOCinzuE";
  const heute = new Date();
  const zeit = heute.getHours();
  let tageszeit;
  let neuesbild;

  console.log(zeit);

  if (zeit >= 0 && zeit <= 5) {
    tageszeit = "Early_Morning";
  } else if (zeit >= 6 && zeit <= 10) {
    tageszeit = "Morning";
  } else if (zeit >= 10 && zeit <= 14) {
    tageszeit = "Noon";
  } else if (zeit >= 15 && zeit <= 19) {
    tageszeit = "Afternoon";
  } else if (zeit >= 20 && zeit <= 24) {
    tageszeit = "night";
  }

  let url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${tageszeit}`;
  console.log(url);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData.results[0]);
      neuesbild = jsonData.results[0].urls.regular;
      Wettercontainer.style.backgroundImage = `url("${neuesbild}")`;
    });
}

window.onload = hintergrundWechseln();

// Wetter für Standort abrufen

function Standortwetter() {
  let ort = sessionStorage.getItem("Ort");
  let ortN = JSON.parse(ort);
  console.log(ortN[ortN.length - 1]);
  let ortNormal = ortN[ortN.length - 1];
  // Zuerst aktuellen Ort in Dokument schreiben //
  let döttmuendeortane = document.getElementById("place");
  döttmuendeortane.innerHTML = ortNormal;
}

btn.addEventListener("click", Standortwetter);

// Aktuelles Datum und Zeit einfügen

function aktuellesDatum() {
  let heute = new Date();
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  function pad(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }
  let datum = `${heute.getDate()}. ${
    monthNames[heute.getMonth()]
  }, ${heute.getFullYear()}`;
  let zeit = `${heute.getHours()}:${pad(heute.getUTCMinutes())}`;
  let döttechunntsdatumane = document.getElementById("datum");
  let döttechunntziitane = document.getElementById("zeit");
  döttechunntsdatumane.innerHTML = datum;
  döttechunntziitane.innerHTML = zeit;
}

window.onload = aktuellesDatum();
