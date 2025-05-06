document.addEventListener('DOMContentLoaded', () => {
      const downloadBtn = document.getElementById('startDownloadBtn');
      const resetBtn = document.getElementById('resetCountBtn');
      const downOverlay = document.getElementById('downOverlay');
      const downOverlayMessage = document.getElementById('downOverlayMessage');
      const htmlContent = document.getElementById('hashim_content').innerHTML;
      const countSpan = document.querySelector('[data-download-count]');
      const storageKey = 'zip_download_count';

      // Load count
      let downloadCount = parseInt(localStorage.getItem(storageKey)) || 0;
      countSpan.textContent = downloadCount.toLocaleString();

      // Handle download button
      downloadBtn.addEventListener('click', () => {
        let secondsLeft = 10;
        downOverlay.style.display = 'flex';
        downOverlayMessage.textContent = `Download starting in ${secondsLeft} seconds...`;
        document.body.style.overflow = 'hidden'; // Lock scroll

        const countdown = setInterval(() => {
          secondsLeft--;
          downOverlayMessage.textContent = `Download starting in ${secondsLeft} seconds...`;
          if (secondsLeft <= 0) {
            clearInterval(countdown);
            downOverlayMessage.textContent = 'Downloading ZIP file...';
            generateZip(htmlContent);
          }
        }, 1000);
      });

      // Handle reset
      resetBtn.addEventListener('click', () => {
        const confirmReset = confirm('Are you sure you want to reset the download counter?');
        if (confirmReset) {
          localStorage.removeItem(storageKey);
          downloadCount = 0;
          countSpan.textContent = downloadCount.toLocaleString();
        }
      });

      // ZIP generation and download
      async function generateZip(html) {
        const zip = new JSZip();
        zip.file("index.html", html);
        const blob = await zip.generateAsync({ type: "blob" });

        // Update count
        downloadCount++;
        localStorage.setItem(storageKey, downloadCount);
        countSpan.textContent = downloadCount.toLocaleString();

        // Trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Source-Code.zip';
        link.click();

        // Cleanup
        setTimeout(() => {
          URL.revokeObjectURL(link.href);
          downOverlay.style.display = 'none';
          document.body.style.overflow = ''; // Unlock scroll
        }, 1000);
      }
    });
