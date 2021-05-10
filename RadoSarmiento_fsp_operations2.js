const pool = require ("./db");

const q1 = `
CALL ChangeCustomerEmailTo(4,'emailchange@gmail.com')`;

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();