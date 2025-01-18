import ScrollMagic from "scrollmagic";
import AOS from "aos";
import Flickity from "flickity";
import Alpine from "alpinejs";

window.Alpine = Alpine;
window.Flickity = Flickity;

import "./flickity_init";
import "./alpine_init";

// Configuration constants
const ANIMATION_TIMING = {
  SCROLL: 1200,
  MENU_TOGGLE: 450,
  MENU_FADE: 650,
  BUTTON_COLOR: 200,
};

const COLORS = {
  WHITE: "white",
  BLACK: "black",
};

// Utility functions
const scrollToElement = (element, duration = ANIMATION_TIMING.SCROLL) => {
  if (!element) return;

  $("html, body").animate(
    {
      scrollTop: $(element).offset().top,
    },
    duration
  );
};

const updateNavbarColors = (color) => {
  requestAnimationFrame(() => {
    $(".menu-container span").css("background-color", color);
    $(".menu-container .rectangle").css("border-color", color);
    $("#logo").css("color", color);
  });
};

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

// ScrollMagic initialization
const initScrollMagic = () => {
  const controller = new ScrollMagic.Controller();

  $("div[data-header]").each(function () {
    const section = $(this);

    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0,
      offset: -$(".navbar").outerHeight(),
      duration: section.height(),
    })
      .on("enter", function () {
        const headerColor = section.attr("data-header");
        const color =
          headerColor === "navbar_scroll_white" ? COLORS.WHITE : COLORS.BLACK;
        updateNavbarColors(color);
      })
      .addTo(controller);
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

  // Handle URL hash scrolling
  const hash = window.location.hash;
  if (hash && $(hash).length) {
    scrollToElement(hash);
  } else {
    $("html, body").animate({ scrollTop: 0 }, "medium");
  }
});
