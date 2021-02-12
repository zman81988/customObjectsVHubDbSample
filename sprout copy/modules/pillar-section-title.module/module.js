window.onload = function() {
  // Detect support for the behavior property in click event listener
  var supportsNativeSmoothScroll =
    'scrollBehavior' in document.documentElement.style;
  var pillarMenu = document.querySelector('.pillar-navigation__menu-items');

  /*
   * Native smooth scrolling for Chrome, Firefox & Opera
   * See: https://caniuse.com/#feat=css-scroll-behavior
   */

  function nativeSmoothScrollTo(e) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: e.getBoundingClientRect().top + window.pageYOffset
    });
  }

  // Polyfilled smooth scrolling for IE, Edge & Safari
  function smoothScrollTo(to, duration) {
    var element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = Number(new Date());

    /*
     * t = current time
     * b = start value
     * c = change in value
     * d = duration
     */

    var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    var animateScroll = function animateScroll() {
      var currentDate = Number(new Date());
      var currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));

      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  }

  // On pillar menu link click execute smooth scroll and change focus to target element
  if (pillarMenu) {
    pillarMenu.addEventListener('click', function(e) {
      if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        var pillarLinkHref = e.target.getAttribute('href');
        var targetScrollElementId = pillarLinkHref.substring(1);
        var targetScrollElement = document.getElementById(targetScrollElementId);
        if (document.activeElement === targetScrollElement) {
          return false;
        } else {
          targetScrollElement.focus();
        }
        if (supportsNativeSmoothScroll) {
          nativeSmoothScrollTo(targetScrollElement);
        } else {
          smoothScrollTo(targetScrollElement.offsetTop, 600);
        }
      }
    });
  }
};
