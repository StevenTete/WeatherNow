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

// This function obtain the users city from the input text, make an API call, receive the info as a JSON and show the weather info in the corresponding fields

function getAndShowData() {
	// Get the city from Input and concatenate it
    let cityInput = document.getElementById('cityInput').value.trim();
    let query = api + cityInput + '&units=metric' + '&appid=' + key + '&lang=en';

	// Show text warning if search button is pressed and input empty
	if (cityInput === '') {
		noSelected.style.opacity = '1'; return;
	}
	
	// Get API data
	fetch(query, {method: 'get', cache: "no-cache"})
	.then(response => response.json())
	.then(json => {
		
		if (json.cod == 404) {
			searchedLocation.innerHTML = '';
			weatherStatus.innerHTML = '';
			tempText.innerHTML = '';
			humidity.innerHTML = '';
			wind.innerHTML = '';
			errorText.innerHTML = 'Country, state or city not found.';
			error404.style.display = 'block';
			setTimeout(()=>{
				console.clear();
			}, 5);
			
			setTimeout(()=> {
				errorText.innerHTML = '';
				error404.style.display = 'none';
				backToSearch.click();
			 }
			 ,3000);
		}
		searchedLocation.innerHTML = cityInput + ` <img src="https://flagsapi.com/${json.sys.country}/flat/64.png" style="vertical-align: middle; max-height: 55px;">`;

		// Change background image and weather status depending on the weather obtained from the API
		switch (json.weather[0].main) {

			case 'Ash':
			  container.classList.add('ash');
			  container.classList.remove(
				'clear', 'clouds', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sparking-line"></i> Ash particles in the air';
			  break;
		  
			case 'Clear':
			  container.classList.add('clear');
			  container.classList.remove(
				'ash', 'clouds', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-fill"></i> The sky is Clear';
			  break;
		  
			case 'Clouds':
			  container.classList.add('clouds');
			  container.classList.remove(
				'ash', 'clear', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-cloudy-fill"></i> The sky is Cloudy';
			  break;
		  
			case 'Drizzle':
			  container.classList.add('drizzle');
			  container.classList.remove(
				'ash', 'clear', 'clouds', 'dust', 'fog', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-drizzle-fill"></i> The sky is Drizzly';
			  break;
		  
			case 'Dust':
			  container.classList.add('dust');
			  container.classList.remove(
				'ash', 'clouds', 'fog', 'haze', 'mist', 'sand', 'smoke', 'squall', 'clear', 'drizzle', 'rain', 'snow', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Dusty conditions prevail';
			  break;
		  
			case 'Fog':
			  container.classList.add('fog');
			  container.classList.remove(
				'ash', 'clear', 'clouds', 'drizzle', 'dust', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> There is a lot of Fog';
			  break;
		  
			case 'Haze':
			  container.classList.add('haze');
			  container.classList.remove(
				'ash', 'clear', 'clouds', 'drizzle', 'dust', 'fog', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-haze-line"></i> Light haze in the air';
			  break;
		  
			case 'Mist':
			  container.classList.add('mist');
			  container.classList.remove(
				'ash', 'clear', 'clouds', 'drizzle', 'dust', 'fog', 'haze', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> The sky is Misty';
			  break;
		  
			case 'Rain':
			  container.classList.add('rain');
			  container.classList.remove(
				'clear', 'clouds', 'ash', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-rainy-fill"></i> The sky is Rainy';
			  break;
		  
			case 'Sand':
			  container.classList.add('sand');
			  container.classList.remove(
				'dust', 'haze', 'smoke', 'fog', 'drizzle', 'snow', 'rain', 'clear', 'clouds', 'ash', 'haze', 'mist', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-sun-foggy-line"></i> Sandy conditions in the air';
			  break;
		  
			case 'Smoke':
			  container.classList.add('smoke');
			  container.classList.remove(
				'fog', 'drizzle', 'snow', 'rain', 'clear', 'clouds', 'ash', 'dust', 'haze', 'mist', 'sand', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-mist-fill"></i> Smoke in the air';
			  break;
		  
			case 'Snow':
			  container.classList.add('snow');
			  container.classList.remove(
				'rain', 'clear', 'clouds', 'ash', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'sand', 'smoke', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-snowy-fill"></i> The sky is Snowy';
			  break;
		  
			case 'Squall':
			  container.classList.add('squall');
			  container.classList.remove(
				'ash', 'sand', 'dust', 'haze', 'smoke', 'fog', 'drizzle', 'snow', 'rain', 'clear', 'clouds', 'haze', 'mist', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-windy-line"></i> Sudden squall in progress';
			  break;
		  
			case 'Thunderstorm':
			  container.classList.add('thunderstorm');
			  container.classList.remove(
				'snow', 'rain', 'clear', 'clouds', 'ash', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'sand', 'smoke', 'squall', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i style="font-size: 30px; vertical-align: middle;" class="ri-thunderstorms-fill"></i> The sky is Stormy';
			  break;
		  
			case 'Tornado':
			  container.classList.add('tornado');
			  container.classList.remove(
				'squall', 'ash', 'sand', 'dust', 'haze', 'smoke', 'fog', 'drizzle', 'snow', 'rain', 'clear', 'clouds', 'haze', 'mist', 'thunderstorm'
			  );
			  weatherStatus.innerHTML = `<i style="font-size: 30px; vertical-align: middle;" class="ri-tornado-fill"></i> There's a tornado, please be attentive to the indications of the authorities.`;
			  break;
		  
			default:
			  container.classList.remove(
				'ash', 'clear', 'clouds', 'drizzle', 'dust', 'fog', 'haze', 'mist', 'rain', 'sand', 'smoke', 'snow', 'squall', 'thunderstorm', 'tornado'
			  );
			  weatherStatus.innerHTML = '<i class="ri-question-line"></i> Unknown Weather Status';
			  console.log(json.weather[0].main);
			  break;
		  }
		  

		let tempMode = 0; 
		const termImage = '<img src="Assets/Media/term.png" style="height: 40px; vertical-align: middle;">';

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
		
		// Show the main weather data (temperature, humidity and wind speed) with icons
		tempText.innerHTML = '<img src="Assets/Media/term.png" style="height: 40px; vertical-align: middle;">' + json.main.temp + ' °C';
		humidity.innerHTML = '<img src="Assets/Media/humidity.png" style="height: 37px; vertical-align: middle;"> ' + json.main.humidity + '%';
		wind.innerHTML = '<img src="Assets/Media/wind.png" style="height: 42px; vertical-align: middle;"> ' + json.wind.speed + 'm/s';
	});

	// Alternate from search section to weather info section
	searchSection.classList.remove('show');
	searchSection.classList.add('hide');
	weatherInfo.classList.add('show');
}
// Execute the function getAndShowData()
searchButton.addEventListener('click', () => {
	getAndShowData();
	
});

document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
	  searchButton.click();
	}
  });

  noSelected.addEventListener('click', () => {
	noSelected.style.opacity = 0;
  })

  // Alternate from weather info section to search section
backToSearch.addEventListener('click', () => {
	cityInput.value = "";
	searchSection.classList.add('show');
	weatherInfo.classList.remove('show');
	weatherInfo.classList.add('hide');
	cityInput.focus();
});

