var express = require('express');
var app = express();
var sendmail = require('sendmail')();
var bodyParser = require('body-parser');
var msg = express.Router();
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

msg.route('/dnh')
    .post(function(req, res){
        sendmail({
            from: 'info@destinyandhope.org',
            to: 'info@destinyandhope.org',
            subject: 'Destiny and Hope Foundation enquire',
            html: "<h2><bold>" + req.body.name  + "</bold></h2>" + '<br><br>'
             + req.body.message + "<br><br>"
             + "<p> contact me here: <i>"+ '  ' + req.body.email + "</i></p>"+ " <br><br><br>" +
             "kind regards, <br>" + req.body.name,
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });

         res.json(req.body);
		 console.log(req.body);
    });

app.use(express.static(__dirname + "/public"));

app.use('/api', msg);

app.listen(port);
console.log('server is running...');