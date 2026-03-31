let uploadedLogo=null;

document.getElementById("companyLogo").addEventListener("change",e=>{
 const file=e.target.files[0];
 if(!file)return;
 const reader=new FileReader();
 reader.onload=ev=>uploadedLogo=ev.target.result;
 reader.readAsDataURL(file);
});

function addItem(){
 const div=document.createElement("div");
 div.classList.add("unit");
 div.innerHTML=`
 <input class="description" placeholder="Description">
 <input type="number" class="quantity" placeholder="Qty">
 <input type="number" class="rate" placeholder="Rate">
 <button class="removeItem" onclick="this.parentElement.remove();updateTotals()">X</button>
 `;
 document.getElementById("unitsContainer").appendChild(div);
 div.querySelectorAll("input").forEach(i=>i.addEventListener("input",updateTotals));
 updateTotals();
}

function updateTotals(){
 let subtotal=0;
 document.querySelectorAll(".unit").forEach(unit=>{
  const q=parseFloat(unit.querySelector(".quantity").value)||0;
  const r=parseFloat(unit.querySelector(".rate").value)||0;
  subtotal+=q*r;
 });

 const gstPercent=parseFloat(document.getElementById("gstPercent").value)||0;
 const gstSymbol=document.getElementById("gstSymbol").value||"GST";
 const currency=document.getElementById("currencySymbol").value||"Rs";
 const advance=parseFloat(document.getElementById("advance").value)||0;

 const gst=subtotal*(gstPercent/100);
 const total=subtotal+gst;
 const balance=total-advance;

 document.getElementById("subtotal").innerText=`${currency} ${subtotal.toFixed(2)}`;
 document.getElementById("gst").innerText=`${currency} ${gst.toFixed(2)}`;
 document.getElementById("total").innerText=`${currency} ${total.toFixed(2)}`;
 document.getElementById("advanceDisplay").innerText=`${currency} ${advance.toFixed(2)}`;
 document.getElementById("balance").innerText=`${currency} ${balance.toFixed(2)}`;
 document.getElementById("gstLabel").innerText=`${gstSymbol} (${gstPercent}%)`;
}

async function generateInvoice(){
 const {jsPDF}=window.jspdf;
 const doc=new jsPDF();

 const currency=document.getElementById("currencySymbol").value||"Rs";
 const gstSymbol=document.getElementById("gstSymbol").value||"GST";
 const gstPercent=parseFloat(document.getElementById("gstPercent").value)||0;
 const advance=parseFloat(document.getElementById("advance").value)||0;

 if(uploadedLogo) doc.addImage(uploadedLogo,"PNG",10,10,30,30);

 doc.setFontSize(14);
 doc.text(document.getElementById("companyName").value||"HASHIM WEB STORE",45,15);

 doc.setFontSize(10);
 doc.text(document.getElementById("companyDescription").value||"IT Development Solutions",45,21);
 doc.text(document.getElementById("companyPhone").value||"+92 347 9000999",45,26);
 doc.text(document.getElementById("companyEmail").value||"harmony@example.com",45,31);
 doc.text(document.getElementById("companyAddress").value||"Office #12, Harmony Plaza, Lahore",45,36);

 doc.setFillColor(0, 199, 149);
 doc.rect(10,45,190,12,"F");
 doc.setTextColor(255,255,255);
 doc.text("TEX INVOICE",95,53,{align:"center"});
 doc.setTextColor(0,0,0);

 const name=document.getElementById("name").value;
 const phone = document.getElementById("phoneNumber").value;
 const invoice=document.getElementById("INVOICENumber").value;
 const dateInput =document.getElementById("invoiceDate").value;
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
 doc.text(`Invoice #: ${invoice}`,15,65);
 doc.text(`Customer: ${name}`,15,71);
 doc.text(`Phone: ${phone}`, 15, 77);
 doc.text(`Date: ${invoiceDate}`,130,65);

 let subtotal=0;
 let sr=1;
 const items=[];

 document.querySelectorAll(".unit").forEach(unit=>{
  const desc=unit.querySelector(".description").value;
  const q=parseFloat(unit.querySelector(".quantity").value)||0;
  const r=parseFloat(unit.querySelector(".rate").value)||0;
  const total=q*r;
  subtotal+=total;
  items.push([sr++,desc,q,r.toFixed(2),total.toFixed(2)]);
 });

 if(items.length===0)return alert("Add at least one item");

 const gst=subtotal*(gstPercent/100);
 const grand=subtotal+gst;
 const balance=grand-advance;

 doc.autoTable({
  startY:80,
  head:[["Sr","Description","Qty",`Rate (${currency})`,`Total (${currency})`]],
  body: items,
        columnStyles: {
          0: { cellWidth: 10 },
		  1: { cellWidth: 95 }, // Description
          2: { cellWidth: 15, halign: "center" },
          3: { cellWidth: 30, halign: "right" },
          4: { cellWidth: 35, halign: "right" },
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

 doc.autoTable({
  startY:doc.lastAutoTable.finalY+1,
  margin:{left:128},
  body:[
   ["Subtotal",`${currency} ${subtotal.toFixed(2)}`],
   [`${gstSymbol} (${gstPercent}%)`,`${currency} ${gst.toFixed(2)}`],
   ["Grand Total",`${currency} ${grand.toFixed(2)}`],
   ["Advance",`${currency} ${advance.toFixed(2)}`],
   ["Balance",`${currency} ${balance.toFixed(2)}`]
  ],
  theme: "grid",

  styles: {
    fontSize: 11,
    fontStyle: "bold",
    cellPadding: 3,
    textColor: [0, 0, 0],
    fillColor: [250, 250, 250],
	lineColor: [0, 102, 204],
    lineWidth: 0.3
  },

  columnStyles: {
    0: { cellWidth: 36 },
    1: { cellWidth: 35, halign: "right" }
  },

  didParseCell: function (data) {
    // Highlight Balance row
    if (data.row.index === 4) {
      data.cell.styles.fillColor = [220, 245, 230];
      data.cell.styles.textColor = [0, 100, 0];
      data.cell.styles.fontSize = 12;
    }

    // Make Grand Total darker
    if (data.row.index === 2) {
      data.cell.styles.fillColor = [230, 230, 255];
    }
  }
});

      // Create Blob
const blob = doc.output("blob");
const file = new File([blob], "invoice.pdf", { type: "application/pdf" });

// If Web Share API supported (mobile devices)
if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
  try {
    await navigator.share({
      title: "Invoice",
      text: `Invoice for ${name}`,
      files: [file],
    });
  } catch (err) {
    downloadPDF(blob);
  }
} else {
  downloadPDF(blob);
}
function downloadPDF(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "invoice.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
}

addItem();
updateTotals();