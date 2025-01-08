import ScrollMagic from "scrollmagic";
import AOS from "aos";
import Flickity from 'flickity';
import Alpine from 'alpinejs';

window.Alpine = Alpine
window.Flickity = Flickity

import "./flickity_init";
import "./alpine_init";

$(window).on('load', function() {
    $('html, body').animate({scrollTop: 0}, 'medium');
});

$(document).ready(function () {
    AOS.init({})
    
    // Menu button display effect
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
    
    const blueprint_buttons = document.querySelectorAll(".blueprint_buttons button");
    const slideBackground = document.querySelector(".slide-background");

    blueprint_buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
        // Move the sliding background
        slideBackground.style.width = `${button.offsetWidth}px`;
        slideBackground.style.transform = `translateX(${index * 100}%)`;

        // Update button colors
        blueprint_buttons.forEach((btn) => (btn.style.color = "#000")); // Reset all
        setTimeout(() => {
            button.style.color = "#fff"; // Active button
        }, 200);
        });

    });

    // Button display effect
    const loadpage_button = $(".loadpage");
    loadpage_button.css("visibility", "visible").addClass("in");
    $("#contact-form button").css("visibility", "visible").addClass("in");

    loadpage_button.click(function() {
        $('html, body').animate({
        scrollTop: $('main').offset().top
        }, 1200);
    });


    // ScrollMagic color change functionality for nvaigation bar
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