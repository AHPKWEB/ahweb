<script>
// Android and Windows
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  setTimeout(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted A2HS prompt');
        } else {
          console.log('User dismissed A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  }, 5000); // Show after 5 seconds
});

// iPhone Safari
window.addEventListener('load', function() {
  const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

  if (isIos && !isInStandaloneMode) {
    alert("📲 Install HASHIM WEB App:\nTap Share → Add to Home Screen.");
  }
});
</script>
