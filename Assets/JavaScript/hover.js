/* Store the element in el */
let el = document.getElementById('background');

/* Check if the screen width is greater than 600 pixels */
if (window.innerWidth > 600) {
  /* Add a listener for mousemove event */
  el.addEventListener('mousemove', handleMove);

  /* Add listener for mouseout event to reset the rotation */
  el.addEventListener('mouseout', function() {
    el.style.transition = 'transform 0.5s ease-in-out';
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
  });
}

/* Define function handleMove */
function handleMove(e) {
  /* Get position of mouse cursor with respect to the element */
  const xVal = e.layerX;
  const yVal = e.layerY;

  /* Calculate rotation values along the X and Y axes */
  const yRotation = 10 * ((xVal - el.clientWidth / 2) / el.clientWidth);
  const xRotation = -10 * ((yVal - el.clientHeight / 2) / el.clientHeight);

  /* Generate string for CSS transform property */
  const transformValue =
    'perspective(500px) scale(1.05) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';

  /* Apply the calculated transformation with a smooth transition */
  el.style.transition = 'transform 0.1s ease-out';
  el.style.transform = transformValue;
}

/* Add listener for mouseout event to reset the rotation */
el.addEventListener('mouseout', function() {
  el.style.transition = 'transform 0.5s ease-in-out';
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
});
