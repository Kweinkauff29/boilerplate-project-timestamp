// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  console.log( {greeting: 'hello API'} );
  //res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
  var now = new Date();
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  })
});

//app.get("/api/:uinx")

app.get("/api/:date_string", function (req, res) {
  console.log(req, "<=");
  let date_string = req.params.date_string;
  console.log(date_string);
  let newDate = new Date(date_string);
  let dateParse = Date.parse(date_string);
  console.log(dateParse);
  console.log(newDate);

  if (newDate == "Invalid Date") {
    if (date_string.length > 7) {
      let parDate = parseInt(date_string);
      let newUtc = new Date(parDate);
      res.json({
        "unix": date_string,
        "utc": newUtc
      })
    }
    else {
    res.json({ "error" : "Invalid Date" });
    }
  }

  else {
    res.json({
      "unix": newDate.getTime(),
      "utc": newDate.toUTCString()
    });
  }

  res.json({ "error" : "Invalid Date" });
});



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
