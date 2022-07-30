window.addEventListener("DOMContentLoaded", () => {
  var trand = document.querySelector(".trand-slider");
  var options = {
    cellAlign: "left",
    autoPlay: 7000,
    wrapAround: true,
    pageDots: true,
    prevNextButtons: false,
    contain: true,
  };
  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      options.cellAlign = "center";
    } else {
      options.cellAlign = "left";
    }
  }
  var x = window.matchMedia("(max-width: 768px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
  var trandSlider = new Flickity(trand, options);

  var hero = document.querySelector(".hero-slider");
  var heroSlider = new Flickity(hero, {
    // options
    cellAlign: "right",
    autoPlay: 4000,
    wrapAround: true,
    friction: 0.5,
    pageDots: true,
    prevNextButtons: false,
  });

  //Parallaxie
  $(".body").parallaxie({
    speed: -0.4,
    offset: 70,
    size: "cover",
    repeat: "repeat",
  });
  $(".promo").parallaxie({
    size: "cover",
  });
});
