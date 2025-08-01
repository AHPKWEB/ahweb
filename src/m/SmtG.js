 function generateAndDecode() {
      const title = document.getElementById('title').value.trim();
      const desc = document.getElementById('description').value.trim();
      const url = document.getElementById('url').value.trim();
      const image = document.getElementById('image').value.trim();
      const favicon = document.getElementById('favicon').value.trim();
      const robots = document.getElementById('robots').value.trim();
      const org = document.getElementById('org').value.trim();
      const logo = document.getElementById('logo').value.trim();

      const meta = `
<!-- Basic Meta Tags -->
<title>${title}</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<link rel="icon" href="${favicon}" type="image/x-icon">
<meta name="robots" content="${robots}">

<!-- Open Graph / Facebook -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${image}">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${org}",
  "url": "${url}",
  "logo": "${logo}",
  "sameAs": []
}
</script>
`.trim();

      const decoded = document.createElement('textarea');
      decoded.innerHTML = meta;
      const output = document.getElementById('output');
      output.textContent = decoded.value;
      Prism.highlightElement(output);
    }

    function copyToClipboard() {
      const text = document.getElementById('output').textContent;
      if (!text) return alert("Nothing to copy!");
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      alert('Copied to clipboard!');
    }

    function downloadHTML() {
      const content = document.getElementById('output').textContent;
      if (!content) return alert("Generate tags first!");
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meta-tags.html';
      a.click();
      URL.revokeObjectURL(url);
    }
