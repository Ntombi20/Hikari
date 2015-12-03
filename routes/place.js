var geolib = require('geolib');
var _ = require('lodash');

module.exports = function(){
  this.land = function(req, res, next){
    res.render('home');
  }
  this.listPlaces = function(req, res, next){
    req.services(function(err, services){

      var input = JSON.parse(JSON.stringify(req.body));
      var data = "%"+input.place+"%";
      var coords = {
                    latitude: input.latitude,
                    longitude: input.longitude
                   }
      		var placeDataService = services.placeDataService;
          placeDataService.getPlaces(data, function(err, places){
            if(err)	throw err;

            var placesMap = {};

            places.forEach(function(place){
              placesMap[place.name] = {latitude : place.latitude, longitude : place.longitude};
            });

            var orderedPlaces = geolib.orderByDistance(coords, placesMap);
            var placeList = [];
            for(x in places){
              var place = {};
              for(y in orderedPlaces){
                if(places[x].name === orderedPlaces[y].key){
                  place.name = places[x].name;
                  place.img_url = places[x].img_url;
                  place.description = places[x].description;
                  place.catName = places[x].catName;
                  place.tel = places[x].tel;
                  place.email = places[x].email;
                  place.distance = orderedPlaces[y].distance;
                }

              }
              placeList.push(place);
            }
            // { key: 'asdasdasd', latitude: 1, longitude: 2, distance: 4228624 }
        /*    var orderedList = orderedPlaces.map(function(place){
                // find the matchin entry in places
                 var order = _.find(places, function(orderedPlace) {

                  return orderedPlace.key === place.name;
                });
                console.log(order);

                //currentPlace and enrich place
                place.img_url = order.img_url;
              //  place.description = currentPlace.description;
              //  place.catName = currentPlace.catName;
              //  place.tel = currentPlace.tel;
                //place.email = currentPlace.email;
                return place;
            });*/



            placeList = placeList.reverse();
            res.render('listPlaces',{places:placeList});
          });
    });
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
  this.showPlace = function(req, res, next){
    req.services(function(err, services){
      		var placeDataService = services.placeDataService;
          var data = req.params.name;
          data = data.replace("%20", " ");
          placeDataService.showPlace(data, function(err, rows){
            if(err)	throw err;
            res.render('showPlace',{places:rows[0]});
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
