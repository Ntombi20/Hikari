module.exports = function(connection){

  var getData = function(query, cb){
      connection.query(query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getPlaces = function(data, cb){
    insertData('SELECT * FROM places, category WHERE places.category_id = category.id AND name LIKE ?',data, cb );
  };

  this.getCategories = function(cb){
    getData('SELECT * FROM category', cb );
  };

  this.insertPlace = function(data, cb){
    insertData('INSERT INTO places SET ?', data, cb);
  };

}
