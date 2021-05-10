const pool = require ("./db");

const q1 = `
SELECT * FROM midterm_list_of_films`;

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();