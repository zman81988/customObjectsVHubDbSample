(function() {
  // Variables
  var i;
  var pricingSelector = document.querySelectorAll('.billing-selectors__pricing-option input');

  // Event Listeners
  for (i = 0; i < pricingSelector.length; i++) {
    pricingSelector[i].addEventListener('click', function(e) {
      e.preventDefault;
      var priceTarget = 'price-block--' + this.getAttribute('id');
      var priceSection = this.parentElement.parentElement.parentElement
        .nextElementSibling;
      var priceTables = priceSection.querySelectorAll('.price-block');
      for (i = 0; i < priceTables.length; i++) {
        if (priceTables[i].classList.contains(priceTarget)) {
          priceTables[i].style.display = 'flex';
        } else {
          priceTables[i].style.display = 'none';
        }
      }
    });
  }
})();
