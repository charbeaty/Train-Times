// Initialize Firebase


    var firebaseConfig = {
        apiKey: "AIzaSyCE8rdGLLK-NRoc8mHpAAf3mz1VnwJQ8VI",
        authDomain: "trains-d35cd.firebaseapp.com",
        databaseURL: "https://trains-d35cd.firebaseio.com",
        projectId: "trains-d35cd",
        storageBucket: "trains-d35cd.appspot.com",
        messagingSenderId: "848504351420",
        appId: "1:848504351420:web:0b859a477ee8534870beb9"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

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