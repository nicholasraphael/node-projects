var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport( {
    service: 'Gmail',
    auth: {
      user: 'nicholasraphaelgt@gmail.com',
      pass: '@App15nar743'
    }
  });

  var mailOptions = {
    from: 'Nicholas <nicholasraphaelgt@gmail.com>',
    to: 'nicholasraphaelgt@gmail.com',
    subject: 'Web submission',
    text: 'You have a submission from ' + req.body.name + ' Email ' + req.body.email + 'Message' + req.body.message,
    html: '<p>You have a submission from</p>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});

app.listen(3000);
console.log('Server is running on port 3000...');
