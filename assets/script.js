


const firebaseConfig = {
    apiKey: "AIzaSyAEqy1w_rA9vaam91TGLOswjXOkNb5I3GE",
    authDomain: "vandy-d634c.firebaseapp.com",
    databaseURL: "https://vandy-d634c.firebaseio.com",
    projectId: "vandy-d634c",
    storageBucket: "vandy-d634c.appspot.com",
    messagingSenderId: "1053278871795",
    appId: "1:1053278871795:web:d596bb79ce37aaf9"
  };

      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

// Creating New Line of Train
      $("#trackSetter").on("click", function(event) {
          event.preventDefault();

          var trainName = $("#system").val().trim();
          var trainDes = $("#vacay").val().trim();
          var trainArriv = $("#checkPoint").val().trim();
          var trainFreq = $("#timeTravel").val().trim();

         // "temp" var object to pass info to table
         var newTrain = {
             name: trainName,
             dest: trainDes,
             arrive: trainArriv,
             freq: trainFreq
         };

         // Upload-Store new info to firebase
         database.ref().push(newTrain);

console.log (newTrain.name)
console.log (newTrain.dest)
console.log (newTrain.arrive)
console.log (newTrain.freq)

// clears the UI input fields
$("#system").val("");
$("#vacay").val("");
$("#checkPoint").val("");
$("#timeTravel").val("");
      }); // this closes out the function of line 17


      // Creating Firebase interaction plus a row to the table that holds all UI input
database.ref().on("child_added", function(childSnapshot){
console.log (childSnapshot.val());

var train = childSnapshot.val().name;
var viewPort = childSnapshot.val().dest;
var onTime = childSnapshot.val().arrive;
var remainder = childSnapshot.val().freq;

// Creating the new row
var newRow = $("<tr>").append (
    $("<td>").text(train),
    $("<td>").text(viewPort),
    $("<td>").text(onTime),
    $("<td>").text(remainder)    
);

$("#train-table > tbody").append(newRow);

var tFrequency = 15;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

});