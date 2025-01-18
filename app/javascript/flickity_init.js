const clearProjectContents = () => {
  const projectContents = document.getElementById("project_contents");
  projectContents.classList.add("fade-out");

  setTimeout(() => {
    projectContents.innerHTML = "";
    projectContents.classList.remove("fade-out");
  }, 500);
};

// Function to initialize Flickity
function initializeFlickity() {
  var elem = document.querySelector(".main-carousel");
  if (elem) {
    var flkty = new Flickity(elem, {
      cellAlign: "center",
      accessibility: false,
      pageDots: false,
      prevNextButtons: true,
      draggable: true,
      wrapAround: true,
      selectedAttraction: 0.011,
      friction: 0.3,
      freeScrollFriction: 0.011,
      transitionDuration: "0.5s",
      initialIndex: localStorage.getItem("currentSlide") || 0,
    });

    // Save current slide index to localStorage on change event
    flkty.on("change", function (index) {
      $("html, body").animate({ scrollTop: 0 }, "medium");
      clearProjectContents();
    });
  }
}

// Listen for both DOMContentLoaded and turbolinks:load events
document.addEventListener("DOMContentLoaded", initializeFlickity);
document.addEventListener("turbolinks:load", initializeFlickity);
