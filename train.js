const startTime = moment('November, 20, 2019 10:52');
const currentTime = moment();
let nextTrainTime = ""

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDi5ZpJMdl2z1Af-4TrGtluT6YSaQIkzLU",
    authDomain: "homework-45fd6.firebaseapp.com",
    databaseURL: "https://homework-45fd6.firebaseio.com",
    projectId: "homework-45fd6",
    storageBucket: "homework-45fd6.appspot.com",
    messagingSenderId: "933598175132",
    appId: "1:933598175132:web:2b8a095c0c5ffc1795f259",
    measurementId: "G-8M1BD60Y32"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();
  
  
  //   intial values
  let train = ''
  let destination = ''
  let firstTrainTime = ''
  let frequency = ''
  
// capture button click 
$("#add-train").on("click", function (event){
    event.preventDefault();

    // a place to store for retrieval 
    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-traintime-input").val().trim();
    frequency = $("#frequency-min-input").val().trim();

    console.log("DATA ADDED: ", {
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // pushing the info
    dataRef.ref().push({
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});



// This is populating the page with the data that was just submitted by the user
dataRef.ref().on("child_added", function(childSnapshot){
    console.log("SNAPSHOT: ", childSnapshot);
     console.log(childSnapshot.val().train);
     const nextConfig = getNextTrainTime(childSnapshot.val().firstTrainTime, childSnapshot.val().frequency);

    $("tbody").append(
        "<tr><td class = 'list' id='list-itemt'>" + childSnapshot.val().train +
        "<td class= 'list' id='list-itemd'>" + childSnapshot.val().destination +
        "<td class ='list' id='list-itemft'>" + childSnapshot.val().firstTrainTime +
        "<td class ='list' id='list-itemf'>" + childSnapshot.val().frequency + "</td>" +
        "<td class ='list' id='list-itemf'>" + nextConfig.nextTrainTime + "</td>"+
        "<td class ='list' id='list-itemf'>" + nextConfig.timeUntilNextTrain + "</td></tr>"
    );
},
function (errorObject){
 console.log("Errors handled: " + errorObject.code);
});


function getNextTrainTime(initialTime, interval){
    const currentTime = moment();
    const dateString = moment().format("MM-DD-YYYY");
    let nextTrainTime = moment(dateString + " "+ initialTime);

    while(nextTrainTime <= currentTime) {
        nextTrainTime = nextTrainTime.add(interval, 'minutes');
    }

    let timeUntilNextTrain= nextTrainTime.diff(currentTime, "minutes");

    return {
        nextTrainTime: nextTrainTime.format("HH:mm"),
        timeUntilNextTrain
    }

}

$("td").on("click", function (remove){
    dataRef.on('child_added',remove(childSnapShot))
})





























/* (FINAL VERSION)
const response = { data: [
    { initialTime: '14:00', interval: 15,  name: 'TeaRoomTrain', destination: 'TeaTown' },
    { initialTime: '15:15', interval: 30,  name: 'CoffeeRoomTrain', destination: 'CoffeeTown' },
] }; // i'm using snapshot instead
const allTimes = response.data;

for (let i = 0; i < allTimes.length; i++) {

  // const { initialTime, interval } = allTimes[i];
  const initialTimeAsString = allTimes[i].initialTime; // Storing the initialTime for the current object
  const interval = allTimes[i].interval; // Storing the interval for the current object

  const todayAsString = moment().format('MM-DD-YYYY');
  const initialTrainTime = moment(todayAsString + ' ' + initialTimeAsString);
  let nextTrainTime = initialTrainTime;
  let currentTime = moment();

  // Get the next time the train should be here
  while (nextTrainTime < currentTime) {
      nextTrainTime = nextTrainTime.add(interval, 'minutes');
  }

  // Get the difference between now and next train time in minutes
  const timeTillNextTrain = nextTrainTime.diff(currentTime, 'minutes');
  // Show next train time and difference in minutes to the user
    console.log("---------------------------------------------------------");
    console.log('*******Next Train Time', nextTrainTime.toDate());
    console.log('********Difference In Time', timeTillNextTrain);

}


*/
