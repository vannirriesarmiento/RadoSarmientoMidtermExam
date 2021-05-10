const pool = require ("./db");

// Get the total number of films

const q1 = `SELECT COUNT(*)
FROM film;`

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();	

