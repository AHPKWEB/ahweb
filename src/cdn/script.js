initMultiStepForm();function initMultiStepForm(){const progressNumber=document.querySelectorAll(".step").length;const slidePage=document.querySelector(".slide-page");const submitBtn=document.querySelector(".submit");const progressText=document.querySelectorAll(".step p");const progressCheck=document.querySelectorAll(".step .check");const bullet=document.querySelectorAll(".step .bullet");const pages=document.querySelectorAll(".page");const nextButtons=document.querySelectorAll(".next");const prevButtons=document.querySelectorAll(".prev");const stepsNumber=pages.length;if(progressNumber!==stepsNumber){console.warn("Error, number of steps in progress bar do not match number of pages")}
document.documentElement.style.setProperty("--stepNumber",stepsNumber);let current=1;for(let i=0;i<nextButtons.length;i++){nextButtons[i].addEventListener("click",function(event){event.preventDefault();inputsValid=validateInputs(this);if(inputsValid){slidePage.style.marginLeft=`-${
                    (100 / stepsNumber) * current
                }%`;bullet[current-1].classList.add("active");progressCheck[current-1].classList.add("active");progressText[current-1].classList.add("active");current+=1}})}
for(let i=0;i<prevButtons.length;i++){prevButtons[i].addEventListener("click",function(event){event.preventDefault();slidePage.style.marginLeft=`-${
                (100 / stepsNumber) * (current - 2)
            }%`;bullet[current-2].classList.remove("active");progressCheck[current-2].classList.remove("active");progressText[current-2].classList.remove("active");current-=1})}
submitBtn.addEventListener("click",function(){bullet[current-1].classList.add("active");progressCheck[current-1].classList.add("active");progressText[current-1].classList.add("active");current+=1;setTimeout(function(){},800)});function validateInputs(ths){let inputsValid=!0;const inputs=ths.parentElement.parentElement.querySelectorAll("input");for(let i=0;i<inputs.length;i++){const valid=inputs[i].checkValidity();if(!valid){inputsValid=!1;inputs[i].classList.add("invalid-input")}else{inputs[i].classList.remove("invalid-input")}}
return inputsValid}}
var couponDiscount=0;function applyCoupon(){var couponCode=$('#coupon_code').val();if(validCoupons[couponCode]){couponDiscount=validCoupons[couponCode];alert('Coupon applied: '+couponDiscount+'% off')}else{couponDiscount=0;alert('Invalid coupon code')}
getPrice()}
function getPrice(){var duration=$('input[name="duration"]:checked').val();var counts=$('input[name="no_of_cleaners"]:checked').val();var material_cost=$('input[name="material"]:checked').val();var book_date=$('input[name="book_date"]:checked').val();var book_time=$('input[name="book_time"]:checked').val();var base_price=$("#base_price").val();var one_hour=$("#one_hour").val()*counts;var two_hour=($("#two_hour").val()*counts);var three_hour=($("#three_hour").val()*counts);var price=parseInt(base_price);var vat=$("#vat").val();document.getElementById("duration_place").innerHTML=duration+' Hours';document.getElementById("counts_place").innerHTML=counts;if(typeof book_date!=="undefined"){document.getElementById("date_place").innerHTML=book_date}
if(book_time!==""){document.getElementById("time_place").innerHTML=book_time}
if(material_cost==0){document.getElementById("material_place").innerHTML="No"}else{document.getElementById("material_place").innerHTML="Yes"}
var p,vat_rate;if(duration==2){p=parseInt(two_hour*2)+(parseInt(material_cost)*2);vat_rate=(p*vat)/100}else if(duration==3){p=parseInt(three_hour*3)+(parseInt(material_cost)*3);vat_rate=(p*vat)/100}else if(duration==4){p=parseInt(one_hour*4)+(parseInt(material_cost)*4);vat_rate=(p*vat)/100}else if(duration==5){p=parseInt(one_hour*5)+(parseInt(material_cost)*5);vat_rate=(p*vat)/100}else if(duration==6){p=parseInt(one_hour*6)+(parseInt(material_cost)*6);vat_rate=(p*vat)/100}else if(duration==7){p=parseInt(one_hour*7)+(parseInt(material_cost)*7);vat_rate=(p*vat)/100}else if(duration==8){p=parseInt(one_hour*8)+(parseInt(material_cost)*8);vat_rate=(p*vat)/100}
p=parseFloat(p).toFixed(2);var discountAmount=0;if(couponDiscount>0){discountAmount=(p*couponDiscount/100).toFixed(2);p=(p-discountAmount).toFixed(2)}
vat_rate=(p*vat/100).toFixed(2);document.getElementById("price").innerHTML='AED '+p;document.getElementById("vat_place").innerHTML='AED '+vat_rate;document.getElementById("total_price").innerHTML='AED '+(parseFloat(p)+parseFloat(vat_rate)).toFixed(2);document.getElementById("total2_price").innerHTML='AED '+(parseFloat(p)+parseFloat(vat_rate)).toFixed(2);document.getElementById("total3_price").innerHTML='AED '+(parseFloat(p)+parseFloat(vat_rate)).toFixed(2);$(".total_price").text('Total: AED '+(parseFloat(p)+parseFloat(vat_rate)).toFixed(2));document.getElementById("discount_place").innerHTML='Discount: AED '+discountAmount;document.getElementById("discount").value = discountAmount;document.getElementById("amount").value=p;document.getElementById("amount_vat").value=vat_rate;document.getElementById("amount_total").value=(parseFloat(p)+parseFloat(vat_rate)).toFixed(2)}
function getDateTime(){var book_date=$('input[name="book_date"]').val();var book_time=$('input[name="book_time"]:checked').val();if(book_date){$("#date_place").text(book_date)}
if(book_time!==""){$("#time_place").text(book_time)}}
function getTimes(){var book_time=$('input[name="book_time"]:checked').val();if(book_time!=""){document.getElementById("time_place").innerHTML=book_time}};function getUserDetails(){var name=$('input[name="user_name"]').val();var email=$('input[name="user_email"]').val();var phone=$('input[name="user_phone"]').val();var City_Area=$('input[name="city_area"]').val();var Address=$('input[name="Address"]').val();var book_date1=$('input[name="book_date"]').val();$("#user_name_place").text(name);$("#user_email_place").text(email);$("#user_phone_place").text(phone);$("#city_area_place").text(City_Area);$("#adr_phone_place").text(Address);$("#date_place1").text(book_date1)}
$(document).ready(function(){$("input").change(function(){getUserDetails()})});function getTimesched(){var book_time=$('input[name="frequency"]:checked').val();if(book_time!=""){document.getElementById("fsched_place").innerHTML=book_time}}
function addToCart(){var name=$('input[name="user_name"]').val();var email=$('input[name="user_email"]').val();var phone=$('input[name="user_phone"]').val();var City_Area=$('input[name="city_area"]').val();var Address=$('input[name="Address"]').val();var frequency=$('input[name="frequency"]').val();var duration=$('input[name="duration"]:checked').val();var counts=$('input[name="no_of_cleaners"]:checked').val();var material_cost=$('input[name="material"]:checked').val();var book_date=$('input[name="book_date"]').val();var book_time=$('input[name="book_time"]:checked').val();var amount_total=$("#amount_total").val();var cartItem=`
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
         
         </table>
        </div>
    `;$("#cart_items").append(cartItem)}
