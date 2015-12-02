module.exports = function(){
  this.land = function(req, res, next){
    res.render('home');
  }
  this.listPlaces = function(req, res, next){
    console.log(req.body);
    res.render('listPlaces');
  }
  this.showPics = function(req, res, next){
    req.services(function(err, services){
      		var placeDataService = services.placeDataService;
          placeDataService.showPics(function(err, img){
            if(err)	console.log(err);
            res.render('addPlace', {img:img})
          });

    });
  }

  this.postPic = function(req, res, next){
    req.services(function(err, services){
      		var placeDataService = services.placeDataService;
          var path = (req.file.path).replace('public/', '');
          var data = {url : path};
          placeDataService.insertPic(data, function(err, rows){
            if(err)	throw err;
            res.redirect('/');
          });

    });
  }
}
