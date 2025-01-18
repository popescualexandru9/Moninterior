import AOS from "aos";
import Flickity from "flickity";
import Alpine from "alpinejs";
import { ANIMATION_TIMING, COLORS, scrollToElement } from "./helpers";
import { initSortableProjects } from "./sortable_init";
import { initScrollMagic } from "./scrollmagic_init";

window.Alpine = Alpine;
window.Flickity = Flickity;

import "./flickity_init";
import "./alpine_init";

// Menu handlers
const initMenuHandlers = () => {
  $(".menu-button.hamburger").click(function () {
    $(".overlay").fadeToggle(ANIMATION_TIMING.MENU_TOGGLE);
    $(".nav-links").animate({ width: "toggle" }, ANIMATION_TIMING.MENU_TOGGLE);
    $(this).toggleClass("btn-open btn-close");
  });

  $(".nav-links a").click(function () {
    $(".overlay").fadeOut(ANIMATION_TIMING.MENU_FADE);
    $(".nav-links").animate({ width: "toggle" }, ANIMATION_TIMING.MENU_TOGGLE);
    $(".menu-button.hamburger").removeClass("btn-open").addClass("btn-close");
  });
};

// Blueprint buttons functionality
const initBlueprintButtons = () => {
  const buttons = document.querySelectorAll(".blueprint_buttons button");
  const slideBackground = document.querySelector(".slide-background");

  if (!buttons.length || !slideBackground) return;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      slideBackground.style.width = `${button.offsetWidth}px`;
      slideBackground.style.transform = `translateX(${index * 100}%)`;

      buttons.forEach((btn) => (btn.style.color = COLORS.BLACK));
      setTimeout(() => {
        button.style.color = COLORS.WHITE;
      }, ANIMATION_TIMING.BUTTON_COLOR);
    });
  });
};

// Button visibility handlers
const initButtonVisibility = () => {
  const loadpageButton = $(".loadpage");
  loadpageButton.css("visibility", "visible").addClass("in");
  $("#contact-form button").css("visibility", "visible").addClass("in");

  loadpageButton.click(() => scrollToElement("main"));
};

// Alert handlers
const initAlertHandlers = () => {
  const alert = document.querySelector('[role="alert"]');
  if (alert) {
    setTimeout(() => {
      alert.style.opacity = "0";
      setTimeout(() => {
        alert.remove();
      }, 300); // wait for fade out
    }, 2000); // 2 seconds
  }
};

// Render project content
const renderProjectContent = () => {
  document.querySelectorAll(".loadpage").forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project-id");
      fetch(`/projects/${projectId}`)
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("project_contents").innerHTML = html;
        })
        .then(() => initBlueprintButtons())
        .then(() => initScrollMagic());
    });
  });
};

// Vault icon redirect
function initVaultIconRedirect(e) {
  if (e.button === 1) {
    e.preventDefault();
    window.location.replace("/admin/projects");
  }
}
window.initVaultIconRedirect = initVaultIconRedirect;

// Initialize everything when document is ready
$(document).ready(function () {
  AOS.init({});
  renderProjectContent();
  initMenuHandlers();
  initButtonVisibility();
  initScrollMagic();
  initAlertHandlers();
  initSortableProjects();

  // Handle URL hash scrolling
  const hash = window.location.hash;
  if (hash && $(hash).length) {
    scrollToElement(hash);
  } else {
    $("html, body").animate({ scrollTop: 0 }, "medium");
  }
});
