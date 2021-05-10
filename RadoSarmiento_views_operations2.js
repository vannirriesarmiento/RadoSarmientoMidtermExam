const pool = require ("./db");

const q1 = `
SELECT * FROM midterm_total_films_per_category`;

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();