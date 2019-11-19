

























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

  var dataRef =firebase.database();

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
    firstTrainTime = $("#first-traintime").val().trim();
    frequency = $("#frequency-min").val().trim();

    // pushing the info
    dataRef.ref().push({

        train: train,
        destination: destination,
        firstTrainTime: "first train time",
        frequency: frequency,
        dateAdded: firebase.database.ServeValue.TIMESTAMP
    });
});

dataRef.ref().on("child_added", function(childSnapshot){
    // console.log(childSnapshot.val().train);

    $("#list-group").append("<li id='list-group-item'>" + childSnapshot.val().train)+
}