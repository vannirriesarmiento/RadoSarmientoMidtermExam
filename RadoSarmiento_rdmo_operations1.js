const pool = require ("./db");

// Create your own query and describe it.
// DESCRIPTION: A query wherein you can see the title, year of release, and the list of actor/s and actress/es who starred in it.
// OPERATIONS: Joins

const q1 = `SELECT	f.title as "Title",  f.release_year as "Year", 
array_to_string(array_agg(distinct a.first_name || ' ' || a.last_name),', ') as "Actor"
FROM film f
FULL JOIN film_actor fa
ON f.film_id = fa.film_id
FULL JOIN actor a
ON fa.actor_id = a.actor_id
GROUP BY f.title, f.release_year
ORDER BY f.title ASC;`

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();	