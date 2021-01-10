//------Set time to top of page------
var currentDay = $("#currentDay");
function topClock() {
  var todayRightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
  currentDay.html(todayRightNow);
};

setInterval(topClock, 1000);

