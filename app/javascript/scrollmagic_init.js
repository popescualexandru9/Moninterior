import ScrollMagic from "scrollmagic";
import { updateNavbarColors, COLORS } from "./helpers";

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

export { initScrollMagic };
