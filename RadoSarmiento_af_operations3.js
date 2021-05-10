const pool = require ("./db");

// Get the films that have the maximum replacement cost

const q1 = `SELECT film_id, title
FROM film
GROUP BY film_id, title
ORDER BY MAX(replacement_cost) DESC, title ASC;`

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();	

