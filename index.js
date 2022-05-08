// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});
const isValidDate = (d) => {
  return (d instanceof Date && !isNaN(d)) || !isNaN(d);// de verificat 
}

const formatTime = (time) => time > 10 ? time : `0${time}`;
app.get('/api/:input?', (req, res) => {//face match dupa "/" chiar daca nu exista caracter cu ajutorul semnuli =>(?)
  const ceva = req.params.input ? req.params.input : Date.now();//corect
  if (!isValidDate(ceva)) return res.json({ error: "Invalid Date" });//nu valideaza format
  const receivedDate = isNaN(ceva) ? ceva : parseInt(ceva, 10);//se converteste data in numar (parseInt(parametru,10))in baza 10

  const a = new Date(receivedDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = formatTime(a.getHours());
  const min = formatTime(a.getMinutes());
  const sec = formatTime(a.getSeconds());

  res.json({ unix: receivedDate, utc: `${days[a.getDay()]}, ${date} ${month} ${year} ${hour}:${min}:${sec} GMT` })
});