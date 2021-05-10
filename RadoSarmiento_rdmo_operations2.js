const pool = require ("./db");

// Create your own query and describe it.
// DESCRIPTION: A query that determines a movie containing letters Z and O from the between movies containing the letter Z and movies containing the letter O.
// OPERATIONS: Intersect

const q1 = `SELECT	title, rating, f.length
FROM film f
WHERE title LIKE '%z%'
GROUP BY title, rating, f.length
INTERSECT
SELECT	title, 
rating,
f.length
FROM film f
WHERE title LIKE '%o%'
GROUP BY title, rating, f.length
ORDER BY title ASC;`

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();	