function gmod(n,m){return((n%m)+m)%m;}
function kuwaiticalendar(adjust){var today=new Date();if(adjust){adjustmili=1000*60*60*24*adjust;todaymili=today.getTime()+adjustmili;today=new Date(todaymili);}
day=today.getDate();month=today.getMonth();year=today.getFullYear();m=month+1;y=year;if(m<3){y-=1;m+=12;}
a=Math.floor(y/100.);b=2-a+Math.floor(a/4.);if(y<1583)b=0;if(y==1582){if(m>10)b=-10;if(m==10){b=0;if(day>4)b=-10;}}
jd=Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;b=0;if(jd>2299160){a=Math.floor((jd-1867216.25)/36524.25);b=1+a-Math.floor(a/4.);}
bb=jd+b+1524;cc=Math.floor((bb-122.1)/365.25);dd=Math.floor(365.25*cc);ee=Math.floor((bb-dd)/30.6001);day=(bb-dd)-Math.floor(30.6001*ee);month=ee-1;if(ee>13){cc+=1;month=ee-13;}
year=cc-4716;if(adjust){wd=gmod(jd+1-adjust,7)+1;}else{wd=gmod(jd+1,7)+1;}
iyear=10631./30.;epochastro=1948084;epochcivil=1948085;shift1=8.01/60.;z=jd-epochastro;cyc=Math.floor(z/10631.);z=z-10631*cyc;j=Math.floor((z-shift1)/iyear);iy=30*cyc+j;z=z-Math.floor(j*iyear+shift1);im=Math.floor((z+28.5001)/29.5);if(im==13)im=12;id=z-Math.floor(29.5001*im-29);var myRes=new Array(8);myRes[0]=day;myRes[1]=month-1;myRes[2]=year;myRes[3]=jd-1;myRes[4]=wd-1;myRes[5]=id;myRes[6]=im-1;myRes[7]=iy;return myRes;}
function writeIslamicDate(adjustment) {
	var wdNames = new Array("اتوار‬‮","سوموار","منگل‬‮","بدھ‬‮","جمعرات‬‮","جمعہ‬‮","ہفتہ‬‮");
	var iMonthNames = new Array("محرم‬","صفر‬","‫ر بیع الاول‬","‫ر بیع الثانی‬","‫جمادی الاول‬","‫جمادی الثانی‬","رجب‬","شعبان‬","رمضان‬","شوال‬","‫ذوالقعدۃ‬","ذوالحجۃ‬");
	var iDate = kuwaiticalendar(adjustment);
	var outputIslamicDate = "<span>"+wdNames[iDate[4]]+"</span><span>"
   +iDate[5]+"</span><span>"+iMonthNames[iDate[6]]+" , </span>"
   +iDate[7]+"  ھ</span>";
	return outputIslamicDate;
}
function updateClock ( )
 	{
 	var currentTime = new Date ( );
  	var currentHours = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	var currentSeconds = currentTime.getSeconds ( );

  	// Pad the minutes and seconds with leading zeros, if required
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  	// Choose either "AM" or "PM" as appropriate
  	var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  	// Convert the hours component to 12-hour format if needed
  	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  	// Convert an hours component of "0" to "12"
  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  	// Compose the string for display
  	var currentTimeString = currentHours + " : " + currentMinutes + " : " + currentSeconds + " " + timeOfDay;
  	
  	
   	$("#clock").html(currentTimeString);
   	  	
 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});
