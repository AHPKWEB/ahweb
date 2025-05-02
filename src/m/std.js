document.addEventListener('DOMContentLoaded', () => {
  const saveToDisk = document.getElementById('saveToDisk');
  const downloadelement = document.getElementById('hashim_content');
  const countdownOverlay = document.getElementById('countdownOverlay');
  const spinnerOverlay = document.getElementById('spinnerOverlay');
  const countdownText = document.getElementById('countdownText');
  const downloadMessage = document.getElementById('downloadMessage');

  saveToDisk.addEventListener('click', () => {
    const htmlContent = downloadelement?.innerHTML;

    if (!htmlContent) {
      alert('Error: No HTML content to save.');
      return;
    }

    let secondsLeft = 15;
    countdownOverlay.style.display = 'flex';
    countdownText.textContent = `Download starting in ${secondsLeft} seconds...`;

    const countdownInterval = setInterval(() => {
      secondsLeft--;
      countdownText.textContent = `Download starting in ${secondsLeft} seconds...`;

      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
        countdownOverlay.style.display = 'none';
        startDownload(htmlContent);
      }
    }, 1000);
  });

  async function startDownload(htmlContent) {
    spinnerOverlay.style.display = 'flex';
	try {
      const zip = new JSZip();
      zip.file("index.html", htmlContent);
      const blob = await zip.generateAsync({ type: "blob" });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Source-Code.zip";
      link.click();
      URL.revokeObjectURL(link.href);

      saveToDisk.classList.add('success');
      saveToDisk.textContent = 'Downloaded!';
      downloadMessage.style.display = 'block';
	  downloadMessage.textContent = 'ZIP file has been successfully downloaded!';

      setTimeout(() => {
        saveToDisk.classList.remove('success');
        saveToDisk.textContent = 'Download Source-Code';
        downloadMessage.style.display = 'none';
      }, 30000);

    } catch (err) {
      alert('Failed to generate ZIP. Error: ' + err.message);
    } finally {
      spinnerOverlay.style.display = 'none';
	}
  }
});
