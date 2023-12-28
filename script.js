// DOM vars
let searchButton = document.getElementById('search');
let tempText = document.getElementById('temp');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let searchedLocation = document.getElementById('location');
let searchSection = document.getElementById('searchSection');
let weatherInfo = document.getElementById('weatherInfo');
let backToSearch = document.getElementById('backToSearch');
let weatherStatus = document.getElementById('weatherStatus');
let noSelected = document.getElementById('noSelected');
let container = document.getElementById('container');
let errorText = document.getElementById('errorText');
let error404 = document.getElementById('error404');
let cityInput = document.getElementById('cityInput');

// OpenWeather Constants
const api = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = 'ca7d7fdad89664ea1407c30ac66eb163';

// This function obtains the users location from navigator and make a call to the API for show his city weather info
navigator.geolocation.getCurrentPosition(position => {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	let queryUsersLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    
	fetch(queryUsersLocation)
	.then(usersLocation => usersLocation.json())
	.then(usersLocation => {

		handleWeatherData(usersLocation);
		alternateView();
		
		searchedLocation.innerHTML = usersLocation.name + ` <img class="fadeIn flag" src="https://flagsapi.com/${usersLocation.sys.country}/flat/64.png" loading="lazy" style="vertical-align: middle; max-height: 55px;">`;
	})
	.catch(error => {
		console.error('Error fetching data:', error);
	});

	
	

});

// This function obtains the user's city from the input text, makes an API call, receives the info as JSON, and shows the weather info in the corresponding fields
function getAndShowData() {
    // Get the city from Input and concatenate it
    let cityValue = cityInput.value.trim();
    let query = `${api}${cityValue}&units=metric&appid=${key}&lang=en`;

    // Show text warning if the search button is pressed and input is empty
    if (cityValue === '') {
        noSelected.style.opacity = '1';
        return;
    }

    // Get API data
    fetch(query)
        .then(response => response.json())
        .then(json => {
            if (json.cod == 404) {
                handleNotFoundError();
            } else {
                handleWeatherData(json);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Alternate from the search section to the weather info section
    alternateView();
}

// Additional functions
function handleNotFoundError() {
    searchedLocation.innerHTML = '';
    weatherStatus.innerHTML = '';
    tempText.innerHTML = '';
    humidity.innerHTML = '';
    wind.innerHTML = '';
    errorText.innerHTML = 'Country, state, or city not found.';
    error404.style.display = 'block';

    setTimeout(() => {
        console.clear();
    }, 5);

    setTimeout(() => {
        errorText.innerHTML = '';
        error404.style.display = 'none';
        backToSearch.click();
    }, 3000);
}

function handleWeatherData(json) {
    searchedLocation.innerHTML = cityInput.value + ` <img class="fadeIn flag" src="https://flagsapi.com/${json.sys.country}/flat/64.png" loading="lazy" style="vertical-align: middle; max-height: 55px;">`;

    // Change background image and weather status depending on the weather obtained from the API
    container.className = 'container ' + json.weather[0].main.toLowerCase();

	switch (json.weather[0].main) {

		case 'Ash':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sparking-line"></i> Ash particles in the air';
		break;
	  
		case 'Clear':
		container.className = 'container textShadow ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-fill"></i> The sky is Clear';
		break;
	  
		case 'Clouds':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-cloudy-fill"></i> The sky is Cloudy';
		break;
	  
		case 'Drizzle':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-drizzle-fill"></i> The sky is Drizzly';
		break;
	  
		case 'Dust':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Dusty conditions prevail';
		break;
	  
		case 'Fog':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> There is a lot of Fog';
		break;
	  
		case 'Haze':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Light haze in the air';
		break;
	  
		case 'Mist':
		container.className = 'container textShadow ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> The sky is Misty';
		break;
	  
		case 'Rain':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-rainy-fill"></i> The sky is Rainy';
		break;
	  
		case 'Sand':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-foggy-line"></i> Sandy conditions in the air';
		break;
	  
		case 'Smoke':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> Smoke in the air';
		break;
	  
		case 'Snow':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-snowy-fill"></i> The sky is Snowy';
		break;
	  
		case 'Squall':
			container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-windy-line"></i> Sudden squall in progress';
		  break;
	  
		case 'Thunderstorm':
			container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-thunderstorms-fill"></i> The sky is Stormy';
		  break;
	  
		case 'Tornado':
		container.className = 'container ' + json.weather[0].main.toLowerCase();

		  weatherStatus.innerHTML = `<i style="font-size: 30px; vertical-align: middle;" class="ri-tornado-fill"></i> There's a tornado, please be attentive to the indications of the authorities.`;
		  break;
	  
		default:
		  
		  weatherStatus.innerHTML = '<i class="ri-question-line"></i> Unknown Weather Status';
		  console.log(json.weather[0].main);
		  break;
	  }

    let tempMode = 0;
    const termImage = '<img src="Assets/Media/term.png" loading="lazy" style="height: 40px; vertical-align: middle;">';

    tempText.addEventListener('click', () => {
        const celsiusTemp = json.main.temp;
        let newTemp, unit;

        switch (tempMode) {
				case 0:
					newTemp = celsiusTemp * 9/5 + 32;
					unit = '°F';
					tempMode++;
					break;
				case 1:
					newTemp = 5/9 * (celsiusTemp * 9/5 + 32) + 273.15;
					unit = '°K';
					tempMode++;
					break;
				case 2:
					newTemp = celsiusTemp;
					unit = '°C';
					tempMode = 0;
					
					default: 
					newTemp = celsiusTemp;
					unit = '°C';
					tempMode = 0;
					break;
			}

        tempText.innerHTML = `${termImage}${newTemp.toFixed(2)} ${unit}`;
    });

    // Show the main weather data (temperature, humidity, and wind speed) with icons
    tempText.innerHTML = '<img src="Assets/Media/term.png" loading="lazy" style="height: 40px; vertical-align: middle;">' + json.main.temp + ' °C';
    humidity.innerHTML = '<img src="Assets/Media/humidity.png" loading="lazy" style="height: 37px; vertical-align: middle;"> ' + json.main.humidity + '%';
    wind.innerHTML = '<img src="Assets/Media/wind.png" loading="lazy" style="height: 42px; vertical-align: middle;"> ' + json.wind.speed + 'm/s';
}

// Event listeners
searchButton.addEventListener('click', () => {
    getAndShowData();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

noSelected.addEventListener('click', () => {
    noSelected.style.opacity = 0;
});

// Alternate from weather info section to search section
backToSearch.addEventListener('click', () => {
    cityInput.value = '';
    searchSection.classList.add('show');
    weatherInfo.classList.remove('show');
    weatherInfo.classList.add('hide');
    cityInput.focus();
});

function alternateView() {
	searchSection.classList.remove('show');
    searchSection.classList.add('hide');
    weatherInfo.classList.add('show');
}
// Preload background images for better experience when the background changes
function preloadImages() {
	const imageUrls = [
		'Assets/Media/ash.webp',
		'Assets/Media/clear.gif',
		'Assets/Media/clouds.gif',
		'Assets/Media/drizzle.webp',
		'Assets/Media/fog.webp',
		'Assets/Media/mist.webp',
		'Assets/Media/rainy.webp',
		'Assets/Media/sand.jpg',
		'Assets/Media/smoke.webp',
		'Assets/Media/snow.webp',
		'Assets/Media/squall.jpg',
		'Assets/Media/thunderstorm.webp',
		'Assets/Media/tornado.webp'
	];

	// Crear imágenes y precargarlas
	for (const imageUrl of imageUrls) {
		const img = new Image();
		img.src = imageUrl;
	}
}

window.addEventListener('load', preloadImages);