var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Base64 = require('js-base64').Base64;
var auth = require('http-auth');
var Incident = require('./models/incident');
var UpdateIncident = require('./models/update-incident');

mongoose.connect('mongodb://localhost/status');
var db = mongoose.connection;

var routes = require('./routes/index');


// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));



app.get('/', function(req,res){
    res.render('index',{

    });
});

app.get('/incident/open', function(request, response) {
    Incident.find({'status':'ongoing'},function(err, incidents) {
        if (err) {
            response.status(500).send({error: "Could not fetch incidents"});
        } else {
            response.send(incidents);
        }
    });
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));





// admin stuff below here

var basic = auth.basic({
    realm: "StandBy",
    file: __dirname + "/user.htpasswd"
});
//author security
app.use(auth.connect(basic));
app.get('/add', function(req,res){
    var account ={
        "username":"ask",
        "password":"askask"
    };
    res.render('add',{


    });
});

app.post('/incident', function(request, response) {
    var incident = new Incident();
    incident.title = request.body.title;
    incident.status = request.body.status;
    incident.save(function(err, savedIncident) {
        if (err) {
            response.status(500).send({error:"Could not save incident"});
        } else {
            response.send(savedIncident);
        }
    });
});

app.get('/incident', function(request, response) {

    Incident.find({},function(err, incidents) {
        if (err) {
            response.status(500).send({error: "Could not fetch incidents"});
        } else {
            response.send(incidents);
        }
    });
});

app.get('/incident/open', function(request, response) {

    Incident.find({'status': 'ongoing'},function(err, incidents) {
        if (err) {
            response.status(500).send({error: "Could not fetch incidents"});
        } else {
            response.send(incidents);
        }
    });
});



app.put('/CloseIncident', function(request, response) {
    console.log(request.body.incidentId);
    Incident.update({ _id:request.body.incidentId }, { $set: { status: 'Closed' }}, function(err, incidents) {
        if (err) {
            response.status(500).send({error: "Could not Close incident"});
        } else {
            response.send("Successfully closed incident " + request.body.incidentId);
        }
    });

});

app.get('/UpdateIncident', function(request, response) {
    UpdateIncident.find({}).populate({path:'incidents', model: 'Incident'}).exec(function(err, UpdateIncident) {
        if (err) {
            response.status(500).send({error:"Could not fetch UpdateIncident"});
        } else {
            response.status(200).send(UpdateIncident);
        }
    })
});

app.post('/UpdateIncident', function(request, response) {
    var updateIncident = new UpdateIncident();
    updateIncident.title = request.body.title;

    updateIncident.save(function(err, newUpdateIncident) {
        if (err) {
            response.status(500).send({error: "Could not create UpdateIncident"});
        } else {
            response.send(newUpdateIncident);
        }
    });
});

app.put('/UpdateIncident/incident/add', function(request, response) {
    Incident.findOne({_id: request.body.incidentId}, function(err, incident) {
        if (err) {
            response.status(500).send({error:"Could not add item to UpdateIncident"});
        } else {
            updateIncident.update({_id:request.body.updateIncidentId}, {$addToSet:{incidents: incident._id}}, function(err, updateIncident) {
                if (err) {
                    response.status(500).send({error:"Could not add item to UpdateIncident"});
                } else {
                    response.send("Successfully added to UpdateIncident");
                }
            });
        }
    })
});

// Set Port
app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});
