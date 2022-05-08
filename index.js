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
  let regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;//verificam daca e format tip 2015-12-15
  if (regex.test(d) == true) {//returnam true
    return true;
  }
  return (d instanceof Date && !isNaN(d)) || !isNaN(d);// verificam daca e tip  date ,
}

const formatTime = (time) => time > 10 ? time : `0${time}`; //daca e cu o cifra mai adaugam un zero= 5:12:5=05:12:05
app.get('/api/:input?', (req, res) => {//face match dupa "/" chiar daca nu exista caracter cu ajutorul semnuli =>(?)
  let regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;//verificam daca e format tip 2015-12-15
  let ceva = req.params.input ? req.params.input : Date.now();//corect
  let receivedDate = isNaN(ceva) ? ceva : parseInt(ceva, 10) //daca data e valida o convertim din string in numar 
  let testIfFormat = ceva;
  if (regex.test(testIfFormat) == true) {
    receivedDate = parseInt((new Date(receivedDate).getTime() / 1).toFixed(0))
  }

  if (!isValidDate(ceva)) return res.json({ error: "Invalid Date" });//daca nu e formatul corect afisam mesaj 
  const a = new Date(receivedDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = a.getFullYear();
  const month = months[a.getMonth()];    //extragem din unix in format utc ,se poate si cu functia date.toUTCString();
  const date = a.getDate();
  const hour = formatTime(a.getHours());
  const min = formatTime(a.getMinutes());
  const sec = formatTime(a.getSeconds());



  let date1 = new Date(`${days[a.getDay()]}, ${date} ${month} ${year} ${hour}:${min}:${sec} GMT`);//'Wed, 14 Jun 2017 00:00:00 PDT'
  res.json({ unix: receivedDate, utc: date1.toUTCString() })
});//afisam rezultat de tip json .
