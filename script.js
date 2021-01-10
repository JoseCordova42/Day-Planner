var scheduledHours = [];
var m = moment();
var currentTime = m.hour();

//------Set time to top of page------
var currentDay = $("#currentDay");
setInterval(function() {
  var todayRightNow = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  currentDay.html(todayRightNow);
}, 1000);

//------Generating 12 hour textareas------
for (var hour = 7; hour < 20; hour++) {
  scheduledHours.push(moment({hour}).format('h  a'));
  $(".container").append(/*html*/
    `<div class='row time-block' data-time='${hour}'>
       <!--hour of day-->
           <div class='col-sm col-md-2 hour'>
             <p>${moment({hour}).format('h  a')}</p>
           </div>

        <!--scheduling input-->
           <div class='col-sm col-md-10 d-flex description'>
              <div class='input-group'>
                <textarea class="form-control text-area"></textarea>
                <!--save button-->
                <div class='input-group-append'>
                  <button class='save-button d-flex justify-center align-center'>
                    <i class='far fa-save fa-2x save-icon'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
}

//Checks time and determines past, present, or future in textareas
$.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
  if (Number(dateHour) === m.hour()) {
    $(this).find('textarea').addClass('present');
  } else if (Number(dateHour) < m.hour()) {
    $(this).find('textarea').addClass('past').attr('disabled', 'disabled');
    $(this).find('.save-button').addClass('disabled').attr('disabled', true);
  } else {
    $(this).find('textarea').addClass('future');
  }
});

if (currentTime >=0 && currentTime < 7){
  localStorage.clear();
}

