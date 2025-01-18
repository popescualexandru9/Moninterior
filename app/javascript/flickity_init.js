const clearProjectContents = () => {
  const projectContents = document.getElementById("project_contents");
  projectContents.classList.add("fade-out");

  setTimeout(() => {
    // Prevents the navbar from changing color when the project is chaged
    $("#about").attr("data-header", "navbar_scroll_white");
    projectContents.innerHTML = "";
    projectContents.classList.remove("fade-out");
  }, 200);
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

    flkty.on("change", function (index) {
      $("html, body").animate({ scrollTop: 0 }, "medium");
      clearProjectContents();
    });
  }
}

// Listen for both DOMContentLoaded and turbolinks:load events
document.addEventListener("DOMContentLoaded", initializeFlickity);
document.addEventListener("turbolinks:load", initializeFlickity);
