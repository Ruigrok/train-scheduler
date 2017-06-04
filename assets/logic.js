$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyBI0ziIRTrm9WenKJZlwNBjdHklgzjh0Js",
    authDomain: "train-scheduler-a2893.firebaseapp.com",
    databaseURL: "https://train-scheduler-a2893.firebaseio.com",
    projectId: "train-scheduler-a2893",
    storageBucket: "train-scheduler-a2893.appspot.com",
    messagingSenderId: "714161913979"
  };
  firebase.initializeApp(config);

var database = firebase.database();



  $("#add-train").on("click", function(event) {
      event.preventDefault();
      var trainName = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = moment($("#initial-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequency").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }

      database.ref().push(newTrain);

      $("#new-train").val("");
      $("#destination").val("");
      $("#init-time").val("");
      $("#frequency").val("");
  })

  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainStart = snapshot.val().firstTrain;
    var trainFrequency = snapshot.val().frequency;


  var timeDiff = moment().diff(moment.unix(trainStart), "minutes");
  var trainRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency;
  var minTilArrival = trainFrequency - trainRemainder;

  var arrivaltime = moment().add(minTilArrival, "m").format("hh:mm A");



    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" +  + "</td><td>" + arrivaltime + "</td><td>" + minTilArrival + "</td></tr>");
  });

});