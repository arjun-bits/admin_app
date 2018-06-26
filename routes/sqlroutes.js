var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "USER1",
    password      : "password",
    connectString : "localhost/XE"
  },
  function(err, connection) {
    if (err) {
    	console.log(JSON.stringify(err));
      console.error(err);
      return err;
    }else{
    	//console.log(connection);
    	//console.log(JSON.stringify(connection));
    }// Working Good Until this Line
    //TODO Query Creating Problem 	
    connection.execute("SELECT 'Hello world'",function(err, result) {
        if (err) {
         console.log('Error after Query execution'+JSON.stringify(err));
          return;
        }else{
         console.log('Yay Executed Precise '+result.rows);	
        }
       
      });

    connection.close(
      function(err) {
        if (err) {
        	 console.error('Close the Connection Successfu');
          console.error(err.message);

          return;
        }
      });
  });


