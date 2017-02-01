
    function display(a) {
        var hours = Math.trunc(a / 60);
        var minutes = a % 60;
        if (minutes.count === 1) {
            minutes = "0" + minutes;
        };
       return (hours + ":" + minutes);
    };
    //var d = new Date();
    //var min = d.getMinutes();
    //var hr = d.getHours();
    //console.log(hr + ":" + min);

  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBmvFmYq9r4nn7aYQbyz8xDc4o1GGxonaI",
      authDomain: "barbosa.firebaseapp.com",
      databaseURL: "https://barbosa.firebaseio.com",
      storageBucket: "barbosa.appspot.com",
      messagingSenderId: "275032303726"
  };
firebase.initializeApp(config);

  var trainName = document.getElementById("trainName");
  var destination = document.getElementById("destination");
  var frequency = document.getElementById("frequency");
  var firstTrainTime = document.getElementById("firstTrainTime");
  var trainTimeTemp = document.getElementById("firstTrainTime");

  var ref = firebase.database().ref("info");
  var firebaseRef = firebase.database().ref();
  //console.log(firebaseRef);
  $("form").submit(function () {
      $("#val").validate();
      var inputForm = { trainName: trainName.value, destination: destination.value, frequency: frequency.value, firstTrainTime: trainTimeTemp.value }

      firebaseRef.child("info").push(inputForm);
      $("input").val(" ");
  });
  
  
  ref.on('value', gotData);
 
  function gotData(data) {
      $("#tableMain > tbody tr").remove();
      var inputForm = data.val();
    
      $.each(inputForm, function (i, value) {
          //Dynamic current time
          var d = new Date();
          var min = d.getMinutes();
          var hr = d.getHours();
          var minInHour = hr * 60 + min;
         // console.log(minInHour);

          var currentTime = minInHour;

          function toMinutes(hour, minute) {
              var result = hour * 60;
              result = result + parseInt(minute);              
              return result;            
          }

          var trainStart = value.firstTrainTime;
          var trainStartToMinutes = trainStart.split(":");
          trainStartToMinutes = toMinutes(trainStartToMinutes[0], trainStartToMinutes[1]);

          for (var j = 0; j < 200; j++) {
         
              trainStartToMinutes = trainStartToMinutes + parseInt(value.frequency);
              //console.log(trainStartToMinutes + " " + j);
              //console.log("current time: " +currentTime);
               if (trainStartToMinutes >= currentTime) j = 201;
               var dif = trainStartToMinutes - currentTime;
              var nextArrival = currentTime + dif;

          };
          $("#tableMain > tbody").append("<tr><td>" + value.trainName + "</td><td>" + value.destination + "</td><td>Every " + value.frequency + " minutes</a></td><td>" + display(nextArrival) + "</td><td>"+dif+" minutes</td>");
      });
  }

  
