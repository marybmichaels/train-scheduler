$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAkLn65PNdznyYzWDGvCrRNPiLh44ygeBg",
    authDomain: "hw7train-scheduler.firebaseapp.com",
    databaseURL: "https://hw7train-scheduler.firebaseio.com",
    projectId: "hw7train-scheduler",
    storageBucket: "hw7train-scheduler.appspot.com",
    messagingSenderId: "2758595701"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




// initiate variables
var name = ""; 
var destination = ""; 
var time = "";
var frequency = "";

// when "add-train" is clicked
$('#add-train').on('click', function(){

    // add values to variables
    name = $('#name-input').val();
    destination = $('#dest-input').val();
    time = $('#time-input').val().trim();
    frequency = $('#freq-input').val().trim();

    console.log("name: "+ name, "dest: " + destination,"time: " + time, "freq: " + frequency);
if (name!="" && destination!="" && time!="" && frequency!="") {
    // clear values of each input
    $('#name-input').val("");
    $('#dest-input').val("");
    $('#time-input').val("");
    $('#freq-input').val("");

    // send newest data to firebase
    database.ref().push({
        name,
        destination,
        time,
        frequency
    });
} else {
    alert("All fields have not been filled in.")
};   
})

// take all existing firebase data & show it in the table

// anytime something is added to database, show it in the table
database.ref().on("value", function(snapshot) {
    $('#show-trains').empty()

    console.log(snapshot.val());
    // Set the local variables for highBidder equal to the stored values in firebase.
    //   console.log(child);
    // Change the HTML to reflect the local value in firebase
  snapshot.forEach(function(childSnapshot){
      
      var newName = childSnapshot.val().name;
      var newDest = childSnapshot.val().destination;
      var newTime = childSnapshot.val().time;
      var newFreq = childSnapshot.val().frequency;
      
      console.log(newName, newDest, newTime, newFreq);

    //MOMENT.JS TIME TRACKER
    //PUSH BACK FIRST TIME BY 1 YEAR TO ASSURE IT COMES BEFORE CURRENT TIME
    var trainTimeConverted = moment(newTime, "hh:mm").subtract(1, "years");
    console.log(trainTimeConverted);
    //Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    //TIME DIFFERENCE 
    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);
    //TRAIN TIME APART
    var timeApart = timeDiff % newFreq;
    console.log(timeApart);
    //MINUTES UNTIL NEXT TRAIN
    var arrivalTrain = newFreq - timeApart;
    console.log("MINUTES TILL TRAIN: " + arrivalTrain);

    //NEXT TRAIN ARRIVAL
    var nextTrain = moment().add(arrivalTrain, "minutes");
    var nextTrainTimeConverted = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
    //   outline layout for where data goes in table
      var showName = $('<th scope="row">').text(newName);
      var showDest = $('<td>').text(newDest);
      var showFreq = $('<td>').text(newFreq);
      var showDist = $('<td>').text(nextTrainTimeConverted);
      var showMin = $('<td>').text(arrivalTrain);
      
      
      // upate the DOM w/ info
      var row = $('<tr>').append(showName, showDest, showFreq, showDist, showMin);
      $('#show-trains').prepend(row);
     
        });
    },
    
    // If any errors are experienced, log them to console.
    function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

})