var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    app = express(),
    myConnection = require('express-myconnection'),
    multer = require('multer'),
    Pic = require('./routes/pic'),
    PicDataService = require('./dataServices/picDataService'),
    mysql = require('mysql'),
    ConnectionProvider = require('./routes/connectionProvider');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var dbOptions = {
     host: 'localhost',
      user: 'tarcode',
      password: 'coder123',
      port: 3306,
      database: 'pix'
};
var serviceSetupCallback = function(connection){
	return {
		picDataService : new PicDataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myConnection(mysql, dbOptions, 'pool'));

var pic = new Pic();

app.get('/', pic.land);
app.get('/places', pic.listPlaces);

//app.get('/places', pic.showPics);

app.post('/pictures/upload',multer({ dest: './public/uploads/'}).single('image'), pic.postPic);

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
