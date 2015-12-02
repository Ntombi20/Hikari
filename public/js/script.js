  navigator.geolocation.getCurrentPosition(function(location){
    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude");
  //  var location = loc.innerHTML = location.coords.latitude + ", "+ location.coords.longitude;
    var latitude = lat.value = location.coords.latitude;
    var longitude = lon.value  = location.coords.longitude;
  });
