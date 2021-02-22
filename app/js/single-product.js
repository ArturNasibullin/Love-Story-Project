window.addEventListener("DOMContentLoaded", () => {
  //Form
  let quantityBtn = document.querySelectorAll(".quantity");
  let quantityInput = document.getElementById("quantityInput");
  let price = document.getElementById("price").textContent;
  let total = document.getElementById("totalPrice");
  let number = 1;

  price = price.replace(/р./, "");
  quantityInput.addEventListener("change", (event) => {
    event.preventDefault();
    number = event.target.value;
    total.innerHTML = event.target.value * +price;
  });

  quantityBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.position == "plus") {
        number++;
        quantityInput.value = number;
        total.innerHTML = number * price;
      } else if (btn.dataset.position == "minus" && number > 1) {
        number--;
        quantityInput.value = number;
        total.innerHTML = number * price;
      }
    });
  });

  // Slider
  var singleProduct = document.querySelector(".single-product-slider");
  var singleProductSlider = new Flickity(singleProduct, {
    // options
    cellAlign: "left",
    pageDots: true,
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
