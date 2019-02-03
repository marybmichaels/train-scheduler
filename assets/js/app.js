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
    time = $('#time-input').val();
    frequency = $('#freq-input').val();

    console.log("name: "+ name, "dest: " + destination,"time: " + time, "freq: " + frequency);

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
    //   calculate next arrival

    //   calculate minutes away
      
    //   outline layout for where data goes in table
      var showName = $('<th scope="row">').text(newName);
      var showDest = $('<td>').text(newDest);
      var showTime = $('<td>').text(newTime);
      var showFreq = $('<td>').text(newFreq);
      var showdist = $('<td>').text("x");
      
      
      // upate the DOM w/ info
      var row = $('<tr>').append(showName, showDest, showTime, showFreq);
      $('#show-trains').prepend(row);
     
        });
    },
    
    // If any errors are experienced, log them to console.
    function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

})