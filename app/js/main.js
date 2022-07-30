window.addEventListener("DOMContentLoaded", () => {
  //AOS lib
  AOS.init();

  // Tabs
  let tab = function (nav, items) {
    const tabNav = document.querySelectorAll(nav),
      tabContent = document.querySelectorAll(items);

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
  tab(".product-nav-tab", ".product-tabs-item");
  tab(".shop-nav-tab", ".shop-tabs-item");

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
  let scrollPos = $(window).scrollTop();

  $(window).on("scroll load resize", function () {
    scrollPos = $(this).scrollTop();

    if (scrollPos > 170) {
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
});
