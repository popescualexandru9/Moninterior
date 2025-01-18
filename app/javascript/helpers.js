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

export { ANIMATION_TIMING, COLORS, updateNavbarColors, scrollToElement };
