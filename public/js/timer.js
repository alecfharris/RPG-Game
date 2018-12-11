//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var timer = {

  time: 0,
  lap: 1,

  reset: function () {

    timer.time = 0;
    timer.lap = 1;

    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00");

    // DONE: Empty the "laps" div.
    $("#laps").text("");
  },
  start: function () {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(timer.count, 1000);
      clockRunning = true;
    }
  },
  stop: function () {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  recordLap: function () {

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = timer.timeConverter(timer.time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + timer.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    timer.lap++;
  },
  count: function () {

    // DONE: increment time by 1, remember we cant use "this" here.
    timer.time++;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = timer.timeConverter(timer.time);
      console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },
  timeConverter: function (t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
timer.start();
//   console.log(stopwatch.time)