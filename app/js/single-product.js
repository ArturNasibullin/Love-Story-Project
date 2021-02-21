window.addEventListener("DOMContentLoaded", () => {
  //Form
  let quantityBtnPlus = document.querySelector(".btn--quantity-plus");
  let quantityBtnMinus = document.querySelector(".btn--quantity-minus");
  let quantityInput = document.querySelector(".single-product__input");
  let price = document.querySelector(".single-product__price").textContent;
  let total = document.querySelector(".single-product__total");
  let number = 1;

  price = price.replace(/р./, "");
  quantityInput.addEventListener("change", (event) => {
    total.innerHTML = event.target.value * price;
    number = event.target.value;
  });

  quantityBtnPlus.addEventListener("click", () => {
    number++;
    quantityInput.value = number;
    total.innerHTML = number * price;
  });
  quantityBtnMinus.addEventListener("click", () => {
    if (number > 1) number--;
    quantityInput.value = number;
    total.innerHTML = number * price;
  });

  // Slider
  var singleProduct = document.querySelector(".single-product-slider");
  var singleProductSlider = new Flickity(singleProduct, {
    // options
    cellAlign: "left",
    //  autoPlay: 4000,
    //  wrapAround: true,
    pageDots: true,
    //  prevNextButtons: false,
  });

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
});
