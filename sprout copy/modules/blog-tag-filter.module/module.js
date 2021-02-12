(function() {
  // Variables
  var blogTagSelect = document.querySelector('#tag-select');

  // Functions
  blogTagSelect.addEventListener('change', function() {
    if (blogTagSelect.value) {
      window.location = blogTagSelect.value;
    }
    return false;
  });
})();
