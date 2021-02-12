(function() {
  // Variables
  var i;
  var accordions = document.querySelectorAll('.accordion');

  // Event Listeners
  for (i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function() {
      if (this.getAttribute('aria-expanded') == 'true') {
        this.setAttribute('aria-expanded', 'false');
      } else {
        this.setAttribute('aria-expanded', 'true');
      }
    });
  }
})();
