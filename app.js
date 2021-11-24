// Test s
let btn = document.getElementById("submit");
let eingabe = [];

function ortSpeichern(e) {
  e.preventDefault();
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
