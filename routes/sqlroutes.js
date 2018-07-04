var oracledb = require('oracledb');


module.exports = (app)=>{

	app.get("/search",function(req,res){

     if (req.session === undefined) {
         console.log("/search called while not logged in");
         res.redirect("/");
         return;
     }else{
		console.log(req);
		var query = req.query.query;
		query = query.toString(); 
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
		    	console.log('Connection DONE');
		    	//console.log(JSON.stringify(connection));
		    }// Working Good Until this Line
		    //TODO Query Creating Problem
				console.log(`SELECT * FROM EMP WHERE EMPNO = ${query}`);
		    var pg = connection.execute(`SELECT * FROM EMP WHERE EMPNO = ${query}`, {}, {
		                           outFormat: oracledb.OBJECT
		                       })
		    	.catch( (err) => {connection.close ();});
		    pg.then((result)=>{
					console.log(result.rows);
					res.send(result.rows);
		    });	   
		  });
     }

	});
	
}




