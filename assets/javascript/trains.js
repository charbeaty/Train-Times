// Initialize Firebase
   var config = {
    apiKey: "AIzaSyA_ayk2t2bVv_LSwK62YayTqarnrKc7EKY",
    authDomain: "mondaywednesdayrocks-7e396.firebaseapp.com",
    databaseURL: "https://mondaywednesdayrocks-7e396.firebaseio.com",
    projectId: "mondaywednesdayrocks-7e396",
    storageBucket: "",
    messagingSenderId: "558929409150",
    appId: "1:558929409150:web:e836433c5e71dde736542f"
    };

    firebase.initializeApp(config);


    // Get a reference to the database service
    var database = firebase.database();
  

// Submit Button
$("#add-train-button").on('click', function(event) {
    event.preventDefault();

    //Grab usee input
    var trainName = $('#train-input').val().trim();
    var trainLocation = $('#location-input').val().trim();
    var trainTime = $('#time-input').val().trim();
    var trainFrequency = $('#frequency-input').val();
    
    //Object to hold data
    var newTrain = {
        name: trainName,
        local: trainLocation,
        time: trainTime,
        rate: trainFrequency
    };

    //Upload data to database
    database.ref().push(newTrain);

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
    var trainFrequency = childSnapshot.val().rate;
    
        //Format time
        trainFrequency = parseInt(trainFrequency);
        trainTime = parseInt(trainTime);
    
        var timeLeft = moment().diff(moment.unix(trainTime), 'minutes') % trainFrequency;
        var minutesAway = trainFrequency - timeLeft;
        var nextTrain = moment().add(minutesAway, 'm').format('hh:mm A');
    
    //Create Table
    var trainRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainLocation),
        $('<td>').text(trainFrequency),
        $('<td>').text(nextTrain),
        $('<td>').text(minutesAway)
    );

    //Append to HTML
    $('#table-body').append(trainRow);

});