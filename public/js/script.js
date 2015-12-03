window.initMap = function() {
  navigator.geolocation.getCurrentPosition(function(location){
    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude");
  //  var location = loc.innerHTML = location.coords.latitude + ", "+ location.coords.longitude;
    var latitude = lat.value = location.coords.latitude;
    var longitude = lon.value  = location.coords.longitude;

  var lat = latitude;
  var lon = longitude;

  var myLatLng = {
      lat: lat,
      lng: lon
  };
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
  });

  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'You are here'
  });
  });
};
