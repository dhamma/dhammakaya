var oledb = require('edge-oledb');
 
var options = {
	dsn: "Provider=vfpoledb.1; Data Source=C:/ksana2015/pts-dhammakaya/foxpro/footpg.dbf; Mode=ReadOnly|Share Deny None;",
	query: "SELECT * FROM customers"
}
 
oledb(options, function(error, result){
	if (error) throw error;
	console.log(result);
});	