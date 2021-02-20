window.addEventListener("DOMContentLoaded", () => {
  var elem = document.querySelector(".hero-slider");
  var trand = document.querySelector(".trand-slider");

  var flkty = new Flickity(elem, {
    // options
    cellAlign: "right",
    autoPlay: 4000,
    wrapAround: true,
    friction: 0.5,
    pageDots: true,
    prevNextButtons: false,
  });
  var trandSlider = new Flickity(trand, {
    // options
    cellAlign: "right",
    autoPlay: 7000,
    wrapAround: true,
    pageDots: true,
    prevNextButtons: false,
    // setGallerySize: false,
  });

  //AOS lib
  AOS.init();

  // product tabs
  let tab = function () {
    const tabNav = document.querySelectorAll(".product-nav-tab"),
      tabContent = document.querySelectorAll(".product-tabs-item");

    tabNav.forEach((item) => {
      item.addEventListener("click", selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
      tabNavIndex = this.dataset.tab;
      selectTabContent(tabNavIndex);
    }

    function selectTabContent(tabNavIndex) {
      tabContent.forEach((item) => {
        item.dataset.index == tabNavIndex
          ? item.classList.add("active")
          : item.classList.remove("active");
      });
    }
  };
  tab();

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

  // Button menu
  let btn = document.querySelector(".header__nav-btn");
  let menu = document.querySelector(".header-mobile-menu");
  let menuItem = document.querySelectorAll(".header-mobile-menu__link");

  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
    btn.classList.toggle("active");

    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        btn.classList.remove("active");
        menu.classList.remove("active");
        document.body.style.overflow = "visible";
      });
    });
    // Lock body scroll when Mobile menu is active
    if (menu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  });

  // Fixed menu
  let header = $(".header-grid");
  let mainPage = $(".hero");
  let mainPageH = mainPage.innerHeight();
  let scrollPos = $(window).scrollTop();

  $(window).on("scroll load resize", function () {
    let mainPageH = mainPage.innerHeight();
    scrollPos = $(this).scrollTop();

    if (scrollPos > mainPageH) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  });

  //Smooth Scroll
  function scrollTo() {
    const links = document.querySelectorAll(".header-menu__link");
    links.forEach((each) => (each.onclick = scrollAnchors));
  }

  function scrollAnchors(e, respond = null) {
    const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = respond
      ? respond.getAttribute("href")
      : this.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop - 30, left: 0, behavior: "smooth" });
    const checkIfDone = setInterval(function () {
      const atBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = "-1";
        targetAnchor.focus();
        window.history.pushState("", "", targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }
  scrollTo();

  // let animatedItem = document.querySelectorAll(".animate__animated");
  // animatedItem.forEach((item) => {
  //   item.style.opacity = 0;
  //   let effect = item.dataset.effect;
  //   var waypoint = new Waypoint({
  //     element: item,
  //     handler: function (direction) {
  //       if (effect === "fadeInUp") {
  //         item.classList.add("animate__fadeInUp");
  //       } else if (effect === "fadeInLeft") {
  //         item.classList.add("animate__fadeInLeft");
  //       } else if (effect === "fadeInRight") {
  //         item.classList.add("animate__fadeInRight");
  //       } else if (effect === "flipInX") {
  //         item.classList.add("animate__flipInX");
  //         item.style.opacity = 1;
  //       } else if (effect === "zoomIn") {
  //         item.classList.add("animate__zoomIn");
  //         item.style.opacity = 1;
  //       } else if (effect === "pulse") {
  //         item.classList.add("animate__pulse");
  //         item.style.opacity = 1;
  //       }
  //     },
  //     offset: "75%",
  //   });
  // });
});
