var scheduledHours = [];
var availableHours = [];
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
                  <button class='saveBtn d-flex justify-center align-center'>
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
    $(this)
      .find('textarea')
      .addClass('present');
  } else if (Number(dateHour) < m.hour()) {
    $(this)
      .find('textarea')
      .addClass('past')
      .attr('disabled', 'disabled');
    $(this)
      .find('.saveBtn')
      .addClass('disabled')
      .attr('disabled', true);
  } else {
    $(this)
      .find('textarea')
      .addClass('future');
  }
});

//Clears local storage if current time is outside of 7am-7pm
if (currentTime >=0 && currentTime < 7){
  localStorage.clear();
}

//Check  local storage to set value to availableHours
if (localStorage.getItem('availableHours')) {
  availableHours = JSON.parse(localStorage.getItem('availableHours'));
} else {
  availableHours = {
    '7': {
      time: '7',
      value: ''
    },
    '8': {
      time: '8',
      value: ''
    },
    '9': {
      time: '9',
      value: ''
    },
    '10': {
      time: '10',
      value: ''
    },
    '11': {
      time: '11',
      value: ''
    },
    '12': {
      time: '12',
      value: ''
    },
    '13': {
      time: '13',
      value: ''
    },
    '14': {
      time: '14',
      value: ''
    },
    '15': {
      time: '15',
      value: ''
    },
    '16': {
      time: '16',
      value: ''
    },
    '17': {
      time: '17',
      value: ''
    },
    '18': {
      time: '18',
      value: ''
    },
    '19': {
      time: '19',
      value: ''
    },
    
  };
}

//available hours set to equal user input relative to each row
$('.time-block').each(function() {
  $(this)
    .find('.text-area')
    .val(availableHours[$(this).attr('data-time')].value);
});

//on click saves user input to local storage
$('.saveBtn').on('click', function(event){
  event.preventDefault();

  //set availableHours time attribute
  var timeValue = $(this)
                    .closest('.time-block')
                    .attr('data-time');

  //set availableHours value attribute
    var textValue = $(this)
                      .closest('.time-block')
                      .find('.text-area').val();
                      
    availableHours[timeValue].value = textValue;

  //save user input in each object to local storage
    localStorage.setItem('availableHours', JSON.stringify(availableHours));
});

