
// iPhone Safari
window.addEventListener('load', function() {
  const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

  if (isIos && !isInStandaloneMode) {
    alert("📲 Install HASHIM WEB App:\nTap Share → Add to Home Screen.");
  }
});

