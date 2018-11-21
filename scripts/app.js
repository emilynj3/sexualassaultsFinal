$(document).ready(function(){

	// LOAD ALL THE ITEMS FROM THE DATABASE AND MAKE DIVS CALLED 'CASES'
	var assignmentDatabase = 'https://api.myjson.com/bins/1bi1ga';


	$.ajax({
	  url: assignmentDatabase,
	  type: "GET",
	  dataType: "json",
	  cache: false,
	  success: function(data) {
	      $.each(data, function(index, value) {

	        var dateTime = new Date(value.DateTime);
	        var hour = dateTime.getHours();
	        var minutes = dateTime.getMinutes();
	        var activity = 0;
	       // Add this back in to htmlElement if the activity isn't working"data-activity"'+activity+


					// var htmlElement = '<div class="case" data-hour="'+hour+'" data-minutes="'+minutes+'">'+value.Description+'</div>';

var htmlElement = '<div class="case" data-hour="'+hour+'" data-minutes="'+minutes+'">'+value.Description+''+hour+':'+minutes+'</div>';
					$('#main').append(htmlElement);


	      });

	  },
	});





	// UPDATES THE TIME IN OUR CLOCK
	 setInterval(function() {



		$('#clock').html(timer.hour + ':'+ timer.minutes + ':' + timer.seconds + ' ' + timer.meridiem);

		//CHECK IF CURRENT HOUR == EACH OF CASE HOUR
	  $('.case').each(function() {

			var caseHour = $(this).attr('data-hour');
	    var caseMinutes = $(this).attr('data-minutes');
	    var activity = $(this).attr('data-activity');


			var format = 'hh:mm';
			var caseTime = moment(caseHour + ':'+ caseMinutes, format);
			  	startTime = moment('00:00', format),
			  	currentTime = moment(timer.hour + ':'+ timer.minutes, format);

					// console.log('time = ' + caseTime);
					// console.log('beforeTime = ' + startTime);
					// console.log('aftertime = ' + currentTime);

				if (caseTime.isBetween(startTime, currentTime)) {
				  $(this).addClass('active');
				}


			// if (timer.hour == caseHour && timer.minutes == caseMinutes) {
			// 	$(this).addClass('active');
	    // }




	  // if(timer.hour == 24) {
	  //  	activity = 0;
	  //  }
	  //   //IF CURRENT TIME MATCHES THE CASE TIME, THEN DO SOMETHING
	  // if ((timer.hour >= caseHour && timer.minutes >= caseMinutes) || (activity == 1)) {
    // 	activity = 1;
    //   $(this).addClass('active');
		// } else {
    // 	activity = 0;
    // 	$(this).addClass('passive')
    // }


	  })


	}, 50);





	// Simple Timer
	var timer = {
	  seconds: null,
	  minutes: null,
	  hour: null,
	  date: null,
	  month: null,
	  year: null,
	  meridiem: null,
	  day: null,
	  get: function(type) {
	    return timer[type];
	  },
	  update: function() {

			Date.warp.on();
			Date.warp.speed(100);

	    var now = new Date();

			// add a leading zero
	    timer.seconds = now.getSeconds();
			if (timer.seconds < 10) {
				timer.seconds = '0' + timer.seconds;
			}

	    timer.minutes = now.getMinutes();
			if (timer.minutes < 10) {
				timer.minutes = '0' + timer.minutes;
			}

			timer.hour = now.getHours();
			if (timer.hour < 10) {
				timer.hour = '0' + timer.hour;
			}

	    timer.date = now.getDate();
	    timer.month = now.getMonth();
	    timer.year = now.getFullYear();
	    timer.day = now.getDay();
	    if (timer.hour > 11) {
	      timer.meridiem = "";
	    } else {
	      timer.meridiem = "";
	    }
	  },
	  start: function() {
	    window.console.log("Timer started");
	    timer.update();
	    setInterval(timer.update, 50);
	  }
	};
	timer.start();
	////////////////////////////LIBRARY END


});
