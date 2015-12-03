var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    app = express(),
    myConnection = require('express-myconnection'),
    multer = require('multer'),
    Place = require('./routes/place'),
    PlaceDataService = require('./dataServices/placeDataService'),
    mysql = require('mysql'),
    ConnectionProvider = require('./routes/connectionProvider');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var dbOptions = {
     host: 'localhost',
      user: 'root',
      password: 'coder123',
      port: 3306,
      database: 'khangela'
};
var serviceSetupCallback = function(connection){
	return {
		placeDataService : new PlaceDataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myConnection(mysql, dbOptions, 'pool'));

var place = new Place();

app.get('/', place.land);
app.post('/places', place.listPlaces);
app.get('/places/add', place.showAddPlace);
app.post('/places/add',multer({ dest: './public/uploads/'}).single('img'), place.postPlace);

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
