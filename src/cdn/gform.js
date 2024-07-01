 initMultiStepForm();
function initMultiStepForm() {
    const progressNumber = document.querySelectorAll(".step").length;
    const slidePage = document.querySelector(".slide-page");
    const submitBtn = document.querySelector(".submit");
    const progressText = document.querySelectorAll(".step p");
    const progressCheck = document.querySelectorAll(".step .check");
    const bullet = document.querySelectorAll(".step .bullet");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const stepsNumber = pages.length;

    if (progressNumber !== stepsNumber) {
        console.warn(
            "Error, number of steps in progress bar do not match number of pages"
        );
    }

    document.documentElement.style.setProperty("--stepNumber", stepsNumber);

    let current = 1;

    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            inputsValid = validateInputs(this);
            // inputsValid = true;

            if (inputsValid) {
                slidePage.style.marginLeft = `-${
                    (100 / stepsNumber) * current
                }%`;
                bullet[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                progressText[current - 1].classList.add("active");
                current += 1;
            }
        });
    }
	
    for (let i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function (event) {
            event.preventDefault();
            slidePage.style.marginLeft = `-${
                (100 / stepsNumber) * (current - 2)
            }%`;
            bullet[current - 2].classList.remove("active");
            progressCheck[current - 2].classList.remove("active");
            progressText[current - 2].classList.remove("active");
            current -= 1;
        });
    }
	submitBtn.addEventListener("click", function () {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
		setTimeout(function () {
            // alert("Your Form Successfully ");
            // location.reload();
        }, 800);
    });

    function validateInputs(ths) {
        let inputsValid = true;

        const inputs =
            ths.parentElement.parentElement.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }
}
// JavaScript Document
/*f*/
function getPrice()
{
	var duration=$('input[name="duration"]:checked').val();
	var counts=$('input[name="no_of_cleaners"]:checked').val();
	var material_cost=$('input[name="material"]:checked').val();
	
	var book_date=$('input[name="book_date"]:checked').val();
	var book_time=$('input[name="book_time"]:checked').val();
	
	var base_price=$("#base_price").val();
	var one_hour=($("#one_hour").val()*counts);
	var two_hour=($("#two_hour").val()*counts);
	var three_hour=($("#three_hour").val()*counts);
	var price=parseInt(base_price);
	
	var vat=$("#vat").val();
	
	document.getElementById("duration_place").innerHTML = duration + ' Hours';
	document.getElementById("counts_place").innerHTML = counts;
	if(book_date!="undefined")
	{
		document.getElementById("date_place").innerHTML = book_date;
	}
	if(book_time!="")
	{
		document.getElementById("time_place").innerHTML = book_time;
	}
	if(material_cost==0)
	{
		document.getElementById("material_place").innerHTML = "No";
	}
	else
	{
		document.getElementById("material_place").innerHTML = "Yes";
	}
	if(duration==2)
	{
		var p2=parseInt(two_hour*2)+(parseInt(material_cost)*2);
		vat_rate2=(p2*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p2;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate2;
		document.getElementById("total_price").innerHTML = 'AED ' + (p2+vat_rate2);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p2+vat_rate2);
		$(".total_price").text('Total: AED ' + (p2 + vat_rate2));
		
		document.getElementById("amount").value = p2;
		document.getElementById("amount_vat").value = vat_rate2;
		document.getElementById("amount_total").value = (p2+vat_rate2);
	}
	else if(duration==3)
	{
		var p3=parseInt(three_hour*3)+(parseInt(material_cost)*3);
		vat_rate3=(p3*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p3;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate3;
		document.getElementById("total_price").innerHTML = 'AED ' + (p3+vat_rate3);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p3+vat_rate3);
		$(".total_price").text('Total: AED ' + (p3 + vat_rate3));
		
		document.getElementById("amount").value = p3;
		document.getElementById("amount_vat").value = vat_rate3;
		document.getElementById("amount_total").value = (p3+vat_rate3);
	}
	else if(duration==4)
	{
		var p4=parseInt(one_hour*4)+(parseInt(material_cost)*4);
		vat_rate4=(p4*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p4;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate4;
		document.getElementById("total_price").innerHTML = 'AED ' + (p4+vat_rate4);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p4+vat_rate4);
		$(".total_price").text('Total: AED ' + (p4 + vat_rate4));
		
		document.getElementById("amount").value = p4;
		document.getElementById("amount_vat").value = vat_rate4;
		document.getElementById("amount_total").value = (p4+vat_rate4);
	}
	else if(duration==5)
	{
		var p5=parseInt(one_hour*5)+(parseInt(material_cost)*5);
		vat_rate5=(p5*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p5;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate5;
		document.getElementById("total_price").innerHTML = 'AED ' + (p5+vat_rate5);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p5+vat_rate5);
		$(".total_price").text('Total: AED ' + (p5 + vat_rate5));
		
		document.getElementById("amount").value = p5;
		document.getElementById("amount_vat").value = vat_rate5;
		document.getElementById("amount_total").value = (p5+vat_rate5);
	}
	else if(duration==6)
	{
		var p6=parseInt(one_hour*6)+(parseInt(material_cost)*6);
		vat_rate6=(p6*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p6;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate6;
		document.getElementById("total_price").innerHTML = 'AED ' + (p6+vat_rate6);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p6+vat_rate6);
		$(".total_price").text('Total: AED ' + (p6 + vat_rate6));
		
		document.getElementById("amount").value = p6;
		document.getElementById("amount_vat").value = vat_rate6;
		document.getElementById("amount_total").value = (p6+vat_rate6);
	}
	else if(duration==7)
	{
		var p7=parseInt(one_hour*7)+(parseInt(material_cost)*7);
		vat_rate7=(p7*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p7;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate7;
		document.getElementById("total_price").innerHTML = 'AED ' + (p7+vat_rate7);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p7+vat_rate7);
		$(".total_price").text('Total: AED ' + (p7 + vat_rate7));
		
		document.getElementById("amount").value = p7;
		document.getElementById("amount_vat").value = vat_rate7;
		document.getElementById("amount_total").value = (p7+vat_rate7);
	}
	else if(duration==8)
	{
		var p8=parseInt(one_hour*8)+(parseInt(material_cost)*8);
		vat_rate8=(p8*vat)/100;
		document.getElementById("price").innerHTML = 'AED ' + p8;
		document.getElementById("vat_place").innerHTML = 'AED ' + vat_rate8;
		document.getElementById("total_price").innerHTML = 'AED ' + (p8+vat_rate8);
		document.getElementById("total2_price").innerHTML = 'AED ' + (p8+vat_rate8);
		$(".total_price").text('Total: AED ' + (p8 + vat_rate8));
		
		document.getElementById("amount").value = p8;
		document.getElementById("amount_vat").value = vat_rate8;
		document.getElementById("amount_total").value = (p8+vat_rate8);
	}
}

/*f*/

	//search
  function getDateTime() {
            var book_date = $('input[name="book_date"]').val();
            var book_time = $('input[name="book_time"]:checked').val();
            if (book_date) {
                $("#date_place").text(book_date);
            }
            if (book_time !== "") {
                $("#time_place").text(book_time);
            }
            
        }
	function getTimes()
	{
		var book_time=$('input[name="book_time"]:checked').val();
		if(book_time!="")
		{
			document.getElementById("time_place").innerHTML = book_time;
		}
	};
//
//name directly given

function getUserDetails() {
    var name = $('input[name="user_name"]').val();
    var email = $('input[name="user_email"]').val();
    var phone = $('input[name="user_phone"]').val();
	var City_Area = $('input[name="city_area"]').val();
	var Address = $('input[name="Address"]').val();

    $("#user_name_place").text(name);
    $("#user_email_place").text(email);
    $("#user_phone_place").text(phone);
	$("#city_area_place").text(City_Area);
	$("#adr_phone_place").text(Address);
}

$(document).ready(function () {
    $("input").change(function () {
        getUserDetails();
    });
});
// 
function getTimesched() {
    var book_time = $('input[name="frequency"]:checked').val();
    if (book_time != "") {
        document.getElementById("fsched_place").innerHTML = book_time;
    }
}
function addToCart() {
    var name = $('input[name="user_name"]').val();
    var email = $('input[name="user_email"]').val();
    var phone = $('input[name="user_phone"]').val();
	var City_Area = $('input[name="city_area"]').val();
    var Address = $('input[name="Address"]').val();
    var frequency = $('input[name="frequency"]').val();
    var duration = $('input[name="duration"]:checked').val();
    var counts = $('input[name="no_of_cleaners"]:checked').val();
    var material_cost = $('input[name="material"]:checked').val();
    var book_date = $('input[name="book_date"]').val();
    var book_time = $('input[name="book_time"]:checked').val();
    var amount_total = $("#amount_total").val();

    var cartItem = `
         <div class="cart-item">
	     <table>
         <tr>
            <th>Description</th>
            <th>DETAILS</th>
         </tr>
		 <tr>
            <td>Name:</td>
            <td> ${name}</td>
         </tr>
         <tr>
            <td>Email:</td>
            <td>${email}</td>
         </tr>
         <tr>
            <td>Phone:</td>
            <td>${phone}</td>
         </tr>
		 <tr>
            <td>City area:</td>
            <td>${City_Area}</td>
         </tr>
         <tr>
            <td>Address:</td>
            <td>${Address}</td>
         </tr>
         <tr>
            <td>Frequency</td>
            <td>${frequency}</td>
         </tr>
         <tr>
            <td>Duration:</td>
            <td> ${duration} Hours</td>
         </tr>
         <tr>
            <td>Cleaners:</td>
            <td>${counts}</td>
         </tr>
         <tr>
            <td>Materials:</td>
            <td>${material_cost == 0 ? "No" : "Yes"}</td>
         </tr>
         <tr>
            <td>Booking Date:</td>
            <td>${book_date}</td>
         </tr>
         <tr>
            <td>Booking Time:</td>
            <td>${book_time}</td>
         </tr>
         <tr>
            <td>Total: AED</td>
            <td>${amount_total}</td>
         </tr>
         </table>
        </div>
    `;

    $("#cart_items").append(cartItem);
} 
$('a#copyrighthw').each(function () {
    var a = $(this);
    a.attr({
        'href': 'https://freelancer4pk.blogspot.com/',
        'rel': 'dofollow',
        'title': 'Design',
        'style': 'display: inline-block!important; font-size: inherit!important; color: #ff00ba!important; visibility: visible!important; z-index: 99!important; opacity: 1!important; position: relative!important;'
    }).text('ABU HASHIM');
});
