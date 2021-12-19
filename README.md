# CodingProjectHSG

## Background Information:

Coding Project for Professor Mario Silic' course 3,793,1.00 Programming - Introduction Level
by Hannah Kyburz and Benjamin Koller

**!! Attention: We limited the search to _Switzerland only_ !!**

# Documentation:

The goal of this Project was to create a simple Application, that could display the Weather. The first challenge was to find an API-Provider, where we could get the weather data for free. Our first choice was Meteo, the swiss Weather Service. They have a very powerful API, but only for professional users or special academic projects. They offered us to download datasets, which we could implement into our app. But this wasn't practical for us, as we wanted real-time data, without down- and uploading the files each day. So our search continued, until we found Openweathermap. They offer a very good API with every info we needed, so we registered for a student account, which gave us a high enough API limit to work. One challenge was the structure of the API calls, you couldn't just use the place you entered as a search query for the weather data, it had to be in a universal structure: Latitude and Longitude. So we had to come up with a way to convert the Places a user entered to Latitude and Longtitude. Thankfully, Openweathermap also offers an API for this, we could even use the same API key.

```
function OrtZuKoordinaten(Ort) {
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${Ort},CH&limit=${Suchergebnisse}&appid=${OpenWeatherMapAPI}`;
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
```

So this wasn't a problem anymore. We had out weather data access.

With the Weather Data completed, the next idea that came up was the background Image, which should change according to the place the user selected. Just pulling the image from Google would be to complicated and using Google's API has certain restrictions, as the pictures don't belong to Google. We found Unsplash, a free Image Service, which also happened to offer an API. We again registered with a student access, to get the images. This step was pretty complicated, as the API response was entirelly different. It was our first time working with API's, but it turned out very good.

```
function hintergrundWechseln() {
  const accessKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
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
```

After that, the core functionality worked perfectly. Then came the cosmetics: We thought it would be nice to have specific Icons for the weather, so it looked better visually. The first intention was using real pictures for the Icons, but we found a font, that offers just that and with a much smaller file size. The problem was, we had to map the weather response to individual Icons, which we solved as follows:

```
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
```

After that, we just had to insert the relevant class into the Icon Container, and the correct Icon would be displayed.

Overall, it was very interesting working on this project and we can both say that we learned interesting new ways to code and apply our knowledge. It's especially good to work in a team, as every person has a different "style" to code. By working in a team, we had to bring our styles together to create a working project.

## To do List and current Milestones

- [x] Project scope, what are we doing
- [x] Weather-API Provider Search
- [x] Initial Design
- [x] Select Final Design
- [x] Start JavaScript
- [x] (JS) Change Background Image dynamically
- [x] (JS) Use Weather Icons for Forecasts
- [x] Final JavaScript
