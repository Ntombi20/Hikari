module.exports = function(){
  this.land = function(req, res, next){
    res.render('home');
  }
  this.listPlaces = function(req, res, next){
    console.log(req.body);
    res.render('listPlaces');
  }
  this.showAddPlace = function(req, res, next){
    req.services(function(err, services){
      		var placeDataService = services.placeDataService;
          placeDataService.getCategories(function(err, rows){
            if(err)	throw err;
            res.render('addPlace',{categories:rows});
          });
    });
  }

  this.postPlace = function(req, res, next){
    req.services(function(err, services){
      		var placeDataService = services.placeDataService;
          var input = JSON.parse(JSON.stringify(req.body));
          var path = (req.file.path).replace('public/', '');
          var data = { name: input.name,
                            description: input.description,
                            latitude: input.latitude,
                            longitude: input.longitude,
                            category_id: input.category,
                            tel : input.tel,
                            email: input.email,
                            img_url: path
                          }
          placeDataService.insertPlace(data, function(err, rows){
            if(err)	throw err;
            res.redirect('/');
          });

    });
  }
}
