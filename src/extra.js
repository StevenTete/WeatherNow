if (window.innerWidth > 780) {
function addTooltipTransition(element, tooltip, arrow) {
	element.addEventListener("mouseover", () => {
		tooltip.classList.remove('tooltipOut'); arrow.classList.remove('tooltipOut');
	  tooltip.classList.add('tooltipTransition'); arrow.classList.add('tooltipTransition');
	  tooltip.classList.remove('tooltipOut'); arrow.classList.remove('tooltipOut');
	  tooltip.classList.add('tooltipTransition'); arrow.classList.add('tooltipTransition');
	});
  
	element.addEventListener("mouseout", () => {
		tooltip.classList.remove('tooltipTransition'); arrow.classList.remove('tooltipTransition');
	  tooltip.classList.add('tooltipOut'); arrow.classList.add('tooltipOut');
	});
  }
  
  addTooltipTransition(itemTemperature, tooltip1, arrow1);
  addTooltipTransition(itemHumidity, tooltip2, arrow2);
  addTooltipTransition(itemWind, tooltip3, arrow3);
}

// Preload background images for better experience when the background changes
function preloadImages() {
	const imageUrls = [
		'src/img/clear.gif',
		'src/img/clouds.webp',
		'src/img/drizzle.gif',
		'src/img/fog.webp',
		'src/img/mist.webp',
		'src/img/rainy.webp',
		'src/img/smoke.webp',
		'src/img/snow.webp',
		'src/img/thunderstorm.webp',
		'src/img/term.webp',
		'src/img/humidity.webp',
		'src/img/github.ico',
		'src/img/favicon.ico',
		'src/img/wind.webp'
	];

	// Create image and preload
	for (const imageUrl of imageUrls) {
		const img = new Image();
		img.src = imageUrl;
	}
}

window.addEventListener('load', preloadImages);