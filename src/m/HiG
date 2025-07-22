    let uploadedLogo = null;

    document
      .getElementById("companyLogo")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (event) {
          uploadedLogo = event.target.result;
        };
        reader.readAsDataURL(file);
      });

    document
      .getElementById("advance")
      .addEventListener("input", updateTotals);
    document
      .getElementById("gstPercent")
      .addEventListener("input", () => {
        updateTotals();
        // Update GST percent label in summary table header
        let gstVal = parseFloat(document.getElementById("gstPercent").value);
        if (isNaN(gstVal) || gstVal < 0) gstVal = 0;
        document.getElementById("gstPercentLabel").innerText = gstVal.toFixed(2);
      });
    document
      .getElementById("currencySymbol")
      .addEventListener("input", updateTotals);

    function inputEvents(div) {
      div.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", updateTotals);
      });
    }

    function addItem() {
      const container = document.getElementById("unitsContainer");
      const div = document.createElement("div");
      div.classList.add("unit");
      div.innerHTML = `
        <input type="text" class="description" placeholder="Description" />
        <input type="number" class="quantity" placeholder="Qty" />
        <input type="number" class="rate" placeholder="Rate" />
        <button class="removeItem" onclick="this.parentElement.remove(); updateTotals()">X</button>
      `;
      container.appendChild(div);
      inputEvents(div);
      updateTotals();
    }

    function updateTotals() {
      let subtotal = 0;
      document.querySelectorAll(".unit").forEach((unit) => {
        const qty = parseFloat(unit.querySelector(".quantity")?.value || 0);
        const rate = parseFloat(unit.querySelector(".rate")?.value || 0);
        subtotal += qty * rate;
      });

      const gstPercent =
        parseFloat(document.getElementById("gstPercent").value) || 0;
      const currency = document.getElementById("currencySymbol").value || "Rs";

      const gst = subtotal * (gstPercent / 100);
      const total = subtotal + gst;
      const advance = parseFloat(document.getElementById("advance").value) || 0;
      const balance = total - advance;

      document.getElementById("subtotal").innerText = `${currency} ${subtotal.toFixed(
        2
      )}`;
      document.getElementById("gst").innerText = `${currency} ${gst.toFixed(2)}`;
      document.getElementById("total").innerText = `${currency} ${total.toFixed(
        2
      )}`;
      document.getElementById("advanceDisplay").innerText = `${currency} ${advance.toFixed(
        2
      )}`;
      document.getElementById("balance").innerText = `${currency} ${balance.toFixed(
        2
      )}`;
    }

    async function generateInvoice() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const defaultLogo =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4T5XTv0tUURTH8U+2l1Yq1CoVdpKYJtZKtwslf4d2ZVEW4lYGx01jYWBkVoQFLMzGwJfiHoCh/gMLWWhQRAZBQZFVVDKpVfOdnYZ/dk6cz95xz7gQcT/2A18uOM0jcNQ6AMWsB1fQW67AGnEOavqBtjCrAM6xGz3AnbsA2moq6NCCdzALtBdl0T4egvV4mJALbtQM7QLtQuzgLskM3koRO4A2H4MM1v0FFuAZfgJt60FdbQhhtZTrcAtPS6ApnMEwNKo3b4A/YRJpYCmStG3CqZ7HZcoPjTVZyo8mJG9VdBfFzD/W0N+1DhPSRrgB3OgGV7rOh6I3gCz3GlSuK2MXOWh8sn7VTFXJqlo0gHT+Vy1mwR6jChjPbDt6IEq5W9sIVaR9U6hTNVvFvUoU3hTDZnWH0SVxQGQ8AhXZBHvUY6rkkhMsYcN4y7W4W4WW5/LYijU8hrtaT5+X9KNr6cfSp2VXWQ3DNO9OHAXvvM8mPuDWaUAAAAASUVORK5CYII=";
      const logoToUse = uploadedLogo || defaultLogo;
      doc.addImage(logoToUse, "PNG", 10, 10, 30, 30);

      const companyName =
        document.getElementById("companyName").value || "HASHIM WEB STORE";
	  const companyDescription =
        document.getElementById("companyDescription").value || "IT Development Solutions";
      const companyPhone =
        document.getElementById("companyPhone").value || "+92 347 9000999";
      const companyEmail =
        document.getElementById("companyEmail").value || "harmony@example.com";
      const companyAddress =
        document.getElementById("companyAddress").value ||
        "Office #12, Harmony Plaza, Lahore";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(companyName, 45, 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${companyDescription}`, 45, 21);
      doc.text(`Phone: ${companyPhone}`, 45, 26);
      doc.text(`Email: ${companyEmail}`, 45, 31);
      doc.text(companyAddress, 45, 36);

      doc.setFillColor(0, 150, 200);
      doc.rect(10, 45, 190, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("                        *******  INVOICE  *******", 15, 53);

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phoneNumber").value;
      const invoice = document.getElementById("INVOICENumber").value;
      const dateInput = document.getElementById("invoiceDate").value;
      const invoiceDate = dateInput
        ? new Date(dateInput).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

      const gstPercent =
        parseFloat(document.getElementById("gstPercent").value) || 0;
      const currency = document.getElementById("currencySymbol").value || "Rs";
      const advance = parseFloat(document.getElementById("advance").value) || 0;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Invoice #: ${invoice}`, 15, 65);
      doc.text(`Customer: ${name}`, 15, 71);
      doc.text(`Phone: ${phone}`, 15, 77);
      doc.text(`Invoice Date: ${invoiceDate}`, 130, 65);

      const items = [];
      let subtotal = 0;

      document.querySelectorAll(".unit").forEach((unit) => {
        const desc = unit.querySelector(".description").value;
        const qty = parseFloat(unit.querySelector(".quantity").value) || 0;
        const rate = parseFloat(unit.querySelector(".rate").value) || 0;
        const total = qty * rate;
        subtotal += total;
        items.push([desc, qty, rate.toFixed(2), total.toFixed(2)]);
      });

      if (items.length === 0) return alert("Add at least one item");

      const gst = subtotal * (gstPercent / 100);
      const grandTotal = subtotal + gst;
      const balance = grandTotal - advance;

      doc.autoTable({
        startY: 85,
        head: [["Description", "Qty", `Rate (${currency})`, `Total (${currency})`]],
        body: items,
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 20, halign: "center" },
          2: { cellWidth: 30, halign: "right" },
          3: { cellWidth: 35, halign: "right" },
        },
        headStyles: {
          fillColor: [0, 51, 153],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
          lineColor: [0, 102, 204],
          lineWidth: 0.5,
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 51, 153);
      doc.setFontSize(14);
      doc.text(
        `Subtotal:  ${currency} ${subtotal.toFixed(2)}`,
        135,
        finalY
      );
      doc.text(
        `GST (${gstPercent}%): ${currency} ${gst.toFixed(2)}`,
        135,
        finalY + 7
      );
      doc.text(
        `Total:         ${currency} ${grandTotal.toFixed(2)}`,
        135,
        finalY + 14
      );
      doc.text(
        `PAID:         ${currency} ${advance.toFixed(2)}`,
        135,
        finalY + 21
      );
      doc.text(
        `Balance DUE:${currency} ${balance.toFixed(2)}`,
        129,
        finalY + 28
      );

      

      const blob = doc.output("blob");
      const file = new File([blob], "invoice.pdf", { type: "application/pdf" });

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Invoice",
            text: `Invoice for ${name}`,
            files: [file],
          });
        } catch (e) {
          downloadPDF(blob);
        }
      } else {
        downloadPDF(blob);
      }
    }

    function downloadPDF(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Initialize with one empty item row:
    addItem();
