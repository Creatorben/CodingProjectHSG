// Weather App JavaScript
let btn = document.getElementById('submit');
let eingabe = [];

function ortSpeichern(e) {
  e.preventDefault();
  sessionStorage.removeItem('Ort');
  sessionStorage.clear();
  let ort = document.getElementById('ort').value;
  eingabe.push(ort);
  sessionStorage.setItem('Ort', JSON.stringify(eingabe));
  //   document.forms[0].reset();
}

btn.addEventListener('click', ortSpeichern);

console.log(eingabe);

// Hintergrund wechseln nach Standort
let Wettercontainer = document.querySelector('.bg-container');
console.log(Wettercontainer);

function hintergrundWechseln() {
  const accessKey = 'ncHA1aJyS2eNi7ZowM_Gxw93tTdi-7nhhC4eOCinzuE';
  let ort = OrtHolen();
  let url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${ort}`;
  console.log(url);

  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (jsonData) {
      neuesbild = jsonData.results[0].urls.full;
      Wettercontainer.style.backgroundImage = `url("${neuesbild}")`;
    });
}

// ____________________________________________________________ //
// Wetter für Standort abrufen

const OpenWeatherMapAPI = '8fabe8281116c9e8d15a398f06b23036';
const Suchergebnisse = 1;

function OrtHolen() {
  let ort = sessionStorage.getItem('Ort');
  let ortN = JSON.parse(ort);
  let ortNormal = ortN[ortN.length - 1];
  return ortNormal;
}

function Standortwetter() {
  let ortNormal = OrtHolen();
  // Zuerst aktuellen Ort in Dokument schreiben //
  let döttmuendeortane = document.getElementById('place');
  döttmuendeortane.innerHTML = ortNormal;
  OrtZuKoordinaten(ortNormal);
  hintergrundWechseln();
}

btn.addEventListener('click', Standortwetter);

function OrtZuKoordinaten(Ort) {
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${Ort},CH&limit=${Suchergebnisse}&appid=${OpenWeatherMapAPI}`;
  // Daten abrufen
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      const latitude = jsonData[0].lat;
      const longitude = jsonData[0].lon;
      const Koordinaten = [latitude, longitude];
      sessionStorage.setItem('Koordinaten', JSON.stringify(Koordinaten));
      KoordinatenZuWetter();
    });
}

function KoordinatenZuWetter() {
  // Koordinaten Array aus der Sessionstorage holen
  const Koordinaten = JSON.parse(sessionStorage.getItem('Koordinaten'));
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
  const temp = document.getElementById('tempgross');
  const icon = document.getElementById('grossesIcon');
  // Infos einfügen
  temp.textContent = `${Math.round(data.temp)}°`;
  // console.log(IDzuIcon(data.weather[0].id));
  // icon.className = "";
  icon.className = `wi ${IDzuIcon(data.weather[0].id)} gross`;
}

// Vorhersage nächste Woche ändern

// Temperaturen
function VorhersageTemp(data) {
  console.log(data);
  // Alle relevanten Plätze auswählen, wo etwas eingefügt wird
  const alleTemps = document.querySelectorAll('.temp');
  // Temp herausnehmen
  for (let i = 0; i < alleTemps.length; i++) {
    const element = alleTemps[i];
    element.innerHTML = `${Math.round(data[i].temp.day)}°`;
  }
}

// Vorhersage Icons
function VorhersageIcons(data) {
  // Alle relevanten Plätze auswählen, wo etwas eingefügt wird
  const alleIcons = document.querySelectorAll('.icon');
  console.log(alleIcons);
  // Icons einsetzen
  for (let i = 0; i < alleIcons.length; i++) {
    const element = alleIcons[i].querySelector('.wi');
    element.className = `wi ${IDzuIcon(data[i].weather[0].id)} klein`;
  }
}

// Wetter ID zu Icon übersetzer

function IDzuIcon(ID) {
  let tagnacht;
  if (zeit >= 6 && zeit <= 19) {
    tagnacht = 'day';
  } else {
    tagnacht = 'night';
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
  } else if (ID === 800 && tagnacht === 'day') {
    return `wi-day-sunny`;
  } else if (ID === 800 && tagnacht === 'night') {
    return `wi-night-clear`;
  } else if (ID >= 800 && ID <= 835) {
    return `wi-${tagnacht}-cloudy`;
  }
}

// ____________________________________________________________ //

// Aktuelles Datum und Zeit einfügen
const heute = new Date();
const zeit = heute.getHours();

function aktuellesDatum() {
  const monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  const Wochentage = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  function pad(value) {
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  }
  let datum = `${heute.getDate()}. ${
    monthNames[heute.getMonth()]
  }, ${heute.getFullYear()}`;
  let zeit = `${heute.getHours()}:${pad(heute.getUTCMinutes())}`;
  let döttechunntsdatumane = document.getElementById('datum');
  let döttechunntziitane = document.getElementById('zeit');
  döttechunntsdatumane.innerHTML = datum;
  döttechunntziitane.innerHTML = zeit;
  // Wochentage aktualisieren
  let wochentag = heute.getDay();
  let alliWuchetäg = document.querySelectorAll('.tag');
  for (let i = 0; i < alliWuchetäg.length; i++) {
    const element = alliWuchetäg[i];
    //Wochentage array wrap-over
    if (wochentag + i <= 6) {
      element.innerHTML = Wochentage[wochentag + i];
    } else {
      element.innerHTML = Wochentage[wochentag - 7 + i];
    }
  }
}

window.onload = aktuellesDatum();
