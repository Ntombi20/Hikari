module.exports = function(connection){

  var getData = function(query, cb){
      connection.query(query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.showPics = function(cb){
    getData('SELECT * FROM img ORDER BY id DESC', cb );
  };

  this.insertPic = function (data, cb) {
      insertData('INSERT INTO img SET ?', data, cb );
  };
}
