const pool = require ("./db");

const q1 = `
SELECT * FROM customertotalpurchase(1)`;

pool.query(q1,(err,res)=>{
	try {
		console.log(res.rows);
	} catch (err) {
		console.log(err.message);
	}
});

pool.end();