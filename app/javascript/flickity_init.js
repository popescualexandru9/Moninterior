// Function to initialize Flickity
function initializeFlickity() {
  var elem = document.querySelector('.main-carousel');
  if (elem) {
    var flkty = new Flickity(elem, {
      cellAlign: 'center',
      accessibility: false,
      pageDots: false,
      prevNextButtons: true,
      draggable: true,
      wrapAround: true,
      selectedAttraction: .011,
      friction: 0.30,
      freeScrollFriction: .011,
      transitionDuration: '0.5s',
      initialIndex: localStorage.getItem('currentSlide') || 0
    });

    // Save current slide index to localStorage on change event
    flkty.on('change', function(index) {
      localStorage.setItem('currentSlide', index);
    });
  } 
}

// Listen for both DOMContentLoaded and turbolinks:load events
document.addEventListener('DOMContentLoaded', initializeFlickity);
document.addEventListener('turbolinks:load', initializeFlickity);