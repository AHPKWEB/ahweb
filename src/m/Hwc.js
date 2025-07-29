const form = document.querySelector('#ContactForm');
    const btn = document.querySelector('#submit');

    function showAlert(message) {
      const alertBox = document.getElementById("custom-alert");
      alertBox.innerHTML = message;
      alertBox.style.display = "block";

      setTimeout(function () {
        alertBox.style.display = "none";
      }, 10000); // 10 seconds
    }

    function chatFunction() {
      document.getElementById('chat-box').classList.toggle('active');
      document.getElementById('chat-overlay').classList.toggle('active');
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      btn.disabled = true;
      btn.innerHTML = " Please Wait... ";

      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          btn.disabled = false;
          btn.innerHTML = "Send";
          showAlert('✅ Your message has been sent successfully');
          form.reset();
        })
        .catch(error => {
          btn.disabled = false;
          btn.innerHTML = "Send";
          showAlert('❌ There was an error. Please try again.');
        });
    });
