// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB_wl0d4vgsOXMiIYzsFOiIryhnLoLmIZ8",
    authDomain: "train-times-e99e3.firebaseapp.com",
    databaseURL: "https://train-times-e99e3.firebaseio.com",
    projectId: "train-times-e99e3",
    storageBucket: "train-times-e99e3.appspot.com",
    messagingSenderId: "170300299143",
    appId: "1:170300299143:web:8b36db155e7652d859a522"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// Submit Button
$("#add-train-button").on('click', function(event) {
    event.preventDefault();

    //Grab usee input
    var trainName = $('#train-input').val().trim();
    var trainLocation = $('#location-input').val().trim();
    var trainTime = $('#time-input').val().trim();
    var trainRate = $('#frequence-input').val();
    
    //Object to hold data
    var newTrain = {
        name: trainName,
        local: trainLocation,
        time: trainTime,
        rate: trainRate
    };

    //Upload data to database
    database.ref().set(newTrain);

    //Clear text-boxes
    $('#train-input').val('');
    $('#location-input').val('');
    $('#time-input').val('');
    $('#rate-input').val('');
});

// Create event to add train to Firebase
database.ref().on('child_added', function(childSnapshot) {

    //Create variables
    var trainName = childSnapshot.val().name;
    var trainLocation = childSnapshot.val().local;
    var trainTime = childSnapshot.val().time;
    var trainRate = childSnapshot.val().rate;
    
        //Format time
        trainRate = parseInt(trainRate);
        trainTime = parseInt(trainTime);
    
        var timeLeft = moment().diff(moment.unix(trainTime), 'minutes') % trainRate;
        var minutesAway = trainRate - timeLeft;
        var nextTrain = moment().add(minutesAway, 'm').format('hh:mm A');
    
    //Create Table
    var trainRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainLocation),
        $('<td>').text(trainRate),
        $('<td>').text(nextTrain),
        $('<td>').text(minutesAway)
    );

    //Append to HTML
    $('#table-body').append(trainRow);

});