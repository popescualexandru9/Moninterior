import ScrollMagic from "scrollmagic";
import AOS from "aos";

$(window).on('load', function() {
    $('html, body').animate({scrollTop: 0}, 'medium');
});

$(document).ready(function () {
    AOS.init({})

    $(".menu-button.hamburger").click(function () {
        $(".overlay").fadeToggle(450);
        $(".nav-links").animate({width:'toggle'}, 450);
        $(this).toggleClass('btn-open').toggleClass('btn-close');
    });

    $(".nav-links a").click(function () {
        $(".overlay").fadeOut(650);
        $(".nav-links").animate({ width: 'toggle' }, 450);
        $(".menu-button.hamburger").removeClass('btn-open').addClass('btn-close');
    });
    
    const loadpage_button = $(".loadpage");
    loadpage_button.css("visibility", "visible").addClass("in");
    $("#contact-form button").css("visibility", "visible").addClass("in");

    loadpage_button.click(function() {
        $('html, body').animate({
        scrollTop: $('main').offset().top
        }, 1200);
    });


     // Initialize the ScrollMagic controller
    var controller = new ScrollMagic.Controller();

    // Select all sections that have data-header attributes
    $("div[data-header]").each(function() {
        var section = $(this);
        
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0, // This means the trigger will be at the top of the viewport
            offset: -$(".navbar").outerHeight(),   
            duration: section.height()
        })
        .on("enter", function () {
            // Get the data-header attribute value
            var headerColor = section.attr("data-header");

            // Switch classes on .navbar based on headerColor
            switch (headerColor) {
            case "navbar_scroll_white":
                requestAnimationFrame(() => {
                    $(".menu-container span").css("background-color", "white");
                    $(".menu-container .rectangle").css("border-color", "white");
                    $("#logo").css("color", "white");
                });
                break;
            case "navbar_scroll_black":
                requestAnimationFrame(() => {
                    $(".menu-container span").css("background-color", "black");
                    $(".menu-container .rectangle").css("border-color", "black");
                    $("#logo").css("color", "black");
                });
                break;
           }
        })
        .addTo(controller);
    });
});