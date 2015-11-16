//calculate.js

//get values for all inputs, add them to an array
	//if number is uneven, return error

//


var alltimes = $("#input");
var shifttimes = [];
var hoursTimes = [];
var shiftcalc = $("#shiftcalc");
var hourscalc = $("#hourscalc");
var xtrashift = shiftcalc.html();
var xtraHours = '<span class="plus fa fa-plus"></span><input type="time"><br>'
var fieldsBN = $("#morefields");
var removeBN = $("#lessfields");
var selectShift = $('#shiftsButton');
var selectShift = $('#timesButton');
var type='shiftmode';
var goButton = $('#gobutton');
var calculator = document.getElementById('shiftcalc');
var times = calculator.getElementsByTagName("input");
var hoursCalculator = document.getElementById('hourscalc');
var hoursTimes = hoursCalculator.getElementsByTagName("input");
var timesInner = [];
var timesToAdd = [];
var totalTime = 0;
var totHours = 0;
var totMins = 0;

$( document ).ready(function() {
    console.log( "ready!" );
    times[0].focus();
});

$(hourscalc).hide();
$('#lessfields').hide();

var addFields = function(){
  if (type == 'shiftmode'){
  $('#lessfields').fadeIn();
  var h = $(shiftcalc).height();
  console.log(h);
  $(shiftcalc).animate({
    height: '+=136'
  },500,function(){
      $(shiftcalc).append(xtrashift);
      var h = $(document).height();
      $("#shiftcalc div:last-child").css({opacity:0});
      $("#shiftcalc div:last-child").animate({
        opacity: 1
      },300, function(){
        $("#shiftcalc div:nth-last-child(1) input")[0].focus();
      });
  });
  $('html, body').animate({
        scrollTop: $(document).height()
    }, 'slow');

}else{
  $('#lessfields').fadeIn();
  var h = $(hourscalc).height();
  console.log(h);
  $(hourscalc).animate({
    height: '+=56'
  },500,function(){
      $(hourscalc).append(xtraHours);
      var h = $(document).height();
      $(xtraHours).css({opacity:0});
      $(xtraHours).animate({
        opacity: 1
      },300, function(){
        $("#hourscalc  input:nth-last-child(2)").focus();
      });
  });
  $('html, body').animate({
        scrollTop: $(document).height()
    }, 'slow');
}
}

var removeFields = function(){
  if(type == 'shiftmode'){
  if (($("#shiftcalc > div").length)>1) {
    $("#shiftcalc div:last-child").fadeOut();
    $(shiftcalc).animate({
      height: "-=136"
    },300,function(){
      $("#shiftcalc div:last-child").remove();
    })
} else {
  console.log('minimum fields reached');
}
  if (($("#shiftcalc > div").length)==2){
      $('#lessfields').fadeOut();
  }
} else{
if (($('#hourscalc > input').length)>2) {
    $("#hourscalc div:last-child").fadeOut();
    $(hourscalc).animate({
      height: "-=56"
    },300,function(){
      $("#hourscalc > :last").remove();
      $("#hourscalc > :last").remove();
      $("#hourscalc > :last").remove()
    })
} else {
  console.log('minimum fields reached');
}
  if (($("#hourscalc > input").length)==3){
      $('#lessfields').fadeOut();
  }
} 
}

var calcDecider = function(){
  if(type == 'hoursmode'){
    console.log("type is hoursmode, adding hours now");
    addHours();
  }
  if(type == 'shiftmode'){
    console.log("type is shiftmode, calculating shift now");
    calculateShift();
  }
}


var calculateShift = function(){
  
  console.log('there are '+times.length+' inputs being calculated');  

  for( i=0  ;  i < times.length  ;  i++ ){
      time = times[i].value;
      console.log('time'+[i]+' is: '+time);
      timeSplit = time.split(':');
      hours = timeSplit[0];
      mins = timeSplit[1];
      mins = Number(mins)+Number(hours*60);
      console.log("Time"+[i]+"'s mins are "+mins);
      timesInner.push(mins);
  }

  console.log('timesInner is: ',timesInner);
  console.log("timesInner's length is: "+timesInner.length);
  timesToAdd = [];
  for ( x = 1 ; x <= (times.length/2) ; x++){
    timeA = timesInner.shift();
    timeB = timesInner.shift();
    result = Number(timeB) - Number(timeA);
    console.log('result of shift'+[x]+" is: ", result);
    timesToAdd.push(result);
    
  };
  console.log('now need to add these times: ',timesToAdd);
  totalTime = 0;
  for ( t = 1 ; t <= (times.length/2) ; t++){
    addThis = timesToAdd.shift();
    totalTime += Number(addThis);
    console.log('addingtimes has run');
  }
  console.log('total time in minutes is: ',totalTime);
  console.log('converting minute time to hours and minutes');
  totHours = Math.floor((totalTime/60));
  totMins = totalTime % 60;
  console.log('final result is: ',totHours, totMins);
  if (totMins == 0){
    $('#result').text("You've worked "+totHours+" hours");
    $('#result').animate({
      "font-size": "+=3px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=3px"
      },200)
    })
  }else{
    $('#result').text("You've worked "+totHours+" hours and "+totMins+" minutes");
    $('#result').animate({
      "font-size": "+=3px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=3px"
      },200)
    })
  }
  if(isNaN(totHours) == true || isNaN(totMins) == true){
    $('#result').text("Oops, use 24hr format and fill in all fields");
    $('#result').animate({
      "font-size": "+=1px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=1px"
      },200)
    })
  }
}

var addHours = function(){
  for( i=0  ;  i < hoursTimes.length  ;  i++ ){
      time = hoursTimes[i].value;
      console.log('time'+[i]+' is: '+time);
      timeSplit = time.split(':');
      hours = timeSplit[0];
      mins = timeSplit[1];
      mins = Number(mins)+Number(hours*60);
      console.log("Time"+[i]+"'s mins are "+mins);
      timesToAdd.push(mins);
  }
  totalTime = 0;
  console.log('now need to add these times: ',timesToAdd);
  totalTime = 0;
for ( t = 1 ; t <= (hoursTimes.length) ; t++){
    addThis = timesToAdd.shift();
    totalTime += Number(addThis);
    console.log('addingtimes has run');
  }
  console.log('total time in minutes is: ',totalTime);
  console.log('converting minute time to hours and minutes');
  totHours = Math.floor((totalTime/60));
  totMins = totalTime % 60;
  console.log('final result is: ',totHours, totMins);
  if (totMins == 0){
    $('#result').text("Total: "+totHours+" hours");
    $('#result').animate({
      "font-size": "+=3px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=3px"
      },200)
    })
  }else{
    $('#result').text("Total: "+totHours+" hours and "+totMins+" minutes");
    $('#result').animate({
      "font-size": "+=3px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=3px"
      },200)
    })
  }
  if(isNaN(totHours) == true || isNaN(totMins) == true){
    $('#result').text("Oops, use 24hr format and fill in all fields");
    $('#result').animate({
      "font-size": "+=1px"
    },200, function(){
      $('#result').animate({
        "font-size": "-=1px"
      },200)
    })
  }
}





var hideShiftCalc = function(){
  $(shiftcalc).animate({
    opacity:0,
    left:"-100"
  },300,'swing',function(){
    $(shiftcalc).hide();
  })
  $('#calcwrap').animate({
    height:'auto'
  },300)
}

var showHoursCalc = function(){
  $(hourscalc).animate({
    right:0,
    opacity: 1,
    display: 'inline'
  },300,'swing')
}

var showShiftCalc = function(){
  $(shiftcalc).animate({
    opacity:1,
    left:"0",
    display: 'inline'
  },300,'swing',function(){
    //something?
  })
}

var hideHoursCalc = function(){
  $(hourscalc).animate({
    right:'-100',
    opacity: 0,
    display: 'none'
  },300,'swing',function(){$(hourscalc).hide();})
}

$(shiftsButton).addClass('active');

$(shiftsButton).click(function(){
  if(type == 'shiftmode'){
    console.log('shiftmode already active');
  }else {
    hideHoursCalc();
    setTimeout(function(){showShiftCalc()},300);
    $(shiftsButton).addClass('active');
    $(timesButton).removeClass('active');
    type='shiftmode';
    setTimeout(function(){
    $(times[0]).focus();
}, 400);
}
});

$(timesButton).click(function(){
  if (type == "hoursmode"){
    console.log('hoursmode already active')
  }else{
    hideShiftCalc();
    setTimeout(function(){showHoursCalc()},300);
    $(timesButton).addClass('active');
    $(shiftsButton).removeClass('active');
    type='hoursmode';
    setTimeout(function(){
    $(hoursTimes[0]).focus();
}, 400);
  }
});


$(fieldsBN).click(addFields);
$(removeBN).click(removeFields);
$(gobutton).click(calcDecider);


//for email:
$('.email').click(function(){
    var hrefString = $(this).attr('href');
    var myWindow = window.open(hrefString, "Opening mail client", "width=200, height=100");
        myWindow.document.write("<p>Opening mail client.Please wait!!</p>");
        setTimeout(function(){ myWindow.close() }, 2000);
    });





