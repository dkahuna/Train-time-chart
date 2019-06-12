


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
});