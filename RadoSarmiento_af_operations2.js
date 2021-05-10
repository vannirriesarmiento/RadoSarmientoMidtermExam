const pool = require ("./db");

// Calculate the total length of films grouped by film’s rating

const q1 = `SELECT rating, SUM(length) 
FROM film f
GROUP BY rating
ORDER BY rating ASC;`

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();	

