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
const heute = new Date();
const zeit = heute.getHours();

function hintergrundWechseln() {
  const accessKey = "ncHA1aJyS2eNi7ZowM_Gxw93tTdi-7nhhC4eOCinzuE";
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
// ____________________________________________________________ //
// Wetter für Standort abrufen

const OpenWeatherMapAPI = "8fabe8281116c9e8d15a398f06b23036";
const Suchergebnisse = 1;

function Standortwetter() {
  let ort = sessionStorage.getItem("Ort");
  let ortN = JSON.parse(ort);
  console.log(ortN[ortN.length - 1]);
  let ortNormal = ortN[ortN.length - 1];
  // Zuerst aktuellen Ort in Dokument schreiben //
  let döttmuendeortane = document.getElementById("place");
  döttmuendeortane.innerHTML = ortNormal;
  OrtZuKoordinaten(ortNormal);
}

btn.addEventListener("click", Standortwetter);

function OrtZuKoordinaten(Ort) {
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${Ort},CH&limit=${Suchergebnisse}&appid=${OpenWeatherMapAPI}`;
  console.log(url);
  // Daten abrufen
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      const latitude = jsonData[0].lat;
      const longitude = jsonData[0].lon;
      const Koordinaten = [latitude, longitude];
      sessionStorage.setItem("Koordinaten", JSON.stringify(Koordinaten));
      KoordinatenZuWetter();
    });
}

function KoordinatenZuWetter() {
  // Koordinaten Array aus der Sessionstorage holen
  const Koordinaten = JSON.parse(sessionStorage.getItem("Koordinaten"));
  // Url aufbauen
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${Koordinaten[0]}&lon=${Koordinaten[1]}&units=metric&exclude=minutely,hourly,alerts&appid=${OpenWeatherMapAPI}`;
  // Abfrage
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      // console.log(jsonData);
      AktuellesWetterändern(jsonData.current);
      VorhersageTemp(jsonData.daily);
      VorhersageIcons(jsonData.daily);
    });
}

// Aktuelles Wetter ändern

function AktuellesWetterändern(data) {
  console.log(data);
  // Alle relevanten Plätze auswählen, wo etwas eingefügt wird
  const temp = document.getElementById("tempgross");
  const icon = document.getElementById("grossesIcon");
  // Infos einfügen
  temp.textContent = `${Math.round(data.temp)}°`;
  // console.log(IDzuIcon(data.weather[0].id));
  // icon.className = "";
  icon.classList.replace("wi-day-sleet", IDzuIcon(data.weather[0].id));
}

// Vorhersage nächste Woche ändern

// Temperaturen
function VorhersageTemp(data) {
  console.log(data);
  // Alle relevanten Plätze auswählen, wo etwas eingefügt wird
  const temp1 = document.getElementById("temp1");
  const temp2 = document.getElementById("temp2");
  const temp3 = document.getElementById("temp3");
  const temp4 = document.getElementById("temp4");
  const temp5 = document.getElementById("temp5");
  const temp6 = document.getElementById("temp6");
  const temp7 = document.getElementById("temp7");
  // Temp herausnehmen
  temp1.textContent = `${Math.round(data[0].temp.day)}°`;
  temp2.textContent = `${Math.round(data[1].temp.day)}°`;
  temp3.textContent = `${Math.round(data[2].temp.day)}°`;
  temp4.textContent = `${Math.round(data[3].temp.day)}°`;
  temp5.textContent = `${Math.round(data[4].temp.day)}°`;
  temp6.textContent = `${Math.round(data[5].temp.day)}°`;
  temp7.textContent = `${Math.round(data[6].temp.day)}°`;
}

// Vorhersage Icons
function VorhersageIcons(data) {
  // Alle relevanten Plätze auswählen, wo etwas eingefügt wird
  const icon1 = document.getElementById("icon1").querySelector(".wi");
  const icon2 = document.getElementById("icon2").querySelector(".wi");
  const icon3 = document.getElementById("icon3").querySelector(".wi");
  const icon4 = document.getElementById("icon4").querySelector(".wi");
  const icon5 = document.getElementById("icon5").querySelector(".wi");
  const icon6 = document.getElementById("icon6").querySelector(".wi");
  const icon7 = document.getElementById("icon7").querySelector(".wi");
  // Icons einsetzen
  icon1.classList.replace("wi-day-sleet", IDzuIcon(data[0].weather[0].id));
  icon2.classList.replace("wi-day-sleet", IDzuIcon(data[1].weather[0].id));
  icon3.classList.replace("wi-day-sleet", IDzuIcon(data[2].weather[0].id));
  icon4.classList.replace("wi-day-sleet", IDzuIcon(data[3].weather[0].id));
  icon5.classList.replace("wi-day-sleet", IDzuIcon(data[4].weather[0].id));
  icon6.classList.replace("wi-day-sleet", IDzuIcon(data[5].weather[0].id));
  icon7.classList.replace("wi-day-sleet", IDzuIcon(data[6].weather[0].id));
}

// Wetter ID zu Icon übersetzer

function IDzuIcon(ID) {
  let tagnacht;
  if (zeit >= 6 && zeit <= 19) {
    tagnacht = "day";
  } else {
    tagnacht = "night";
  }

  // Einzelne Icons mappen
  if (ID >= 200 && ID <= 235) {
    return `wi-${tagnacht}-thunderstorm`;
  } else if (ID >= 300 && ID <= 335) {
    return `wi-${tagnacht}-showers`;
  } else if (ID >= 500 && ID <= 535) {
    return `wi-${tagnacht}-rain`;
  } else if (ID >= 600 && ID <= 635) {
    return `wi-snow`;
  } else if (ID >= 700 && ID <= 790) {
    return `wi-dust`;
  } else if ((ID = 800 && tagnacht === "day")) {
    return `wi-day-sunny`;
  } else if ((ID = 800 && tagnacht === "night")) {
    return `wi-night-clear`;
  } else if (ID >= 800 && ID <= 835) {
    return `wi-${tagnacht}-cloudy`;
  }
}

// ____________________________________________________________ //

// Aktuelles Datum und Zeit einfügen

function aktuellesDatum() {
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
