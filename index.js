const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
    res.send('<br><h1><center>Welcome to Rado Sarmiento Server!</center></h1>');
});

// AGGREGATE FUNCTIONS

// Get the total number of films
app.get("/RadoSarmiento_af_operations1", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT COUNT(*)
            FROM film;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// Calculate the total length of films grouped by film’s rating
app.get("/RadoSarmiento_af_operations2", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT rating, SUM(length) 
            FROM film f
            GROUP BY rating
            ORDER BY rating ASC;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// Get the films that have the maximum replacement cost
app.get("/RadoSarmiento_af_operations3", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT film_id, title
            FROM film
            GROUP BY film_id, title
            ORDER BY MAX(replacement_cost) DESC, title ASC;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// VIEWS

// 1
app.get("/RadoSarmiento_views_operations1", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT * FROM midterm_total_films_per_category;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// 2
app.get("/RadoSarmiento_views_operations2", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT * FROM midterm_list_of_films;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// RELATIONAL DATA MODEL OPERATIONS

// Create your own query and describe it.
app.get("/RadoSarmiento_rdmo_operations1", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT	f.title as "Title",  f.release_year as "Year", 
            array_to_string(array_agg(distinct a.first_name || ' ' || a.last_name),', ') as "Actor"
            FROM film f
            FULL JOIN film_actor fa
            ON f.film_id = fa.film_id
            FULL JOIN actor a
            ON fa.actor_id = a.actor_id
            GROUP BY f.title, f.release_year
            ORDER BY f.title ASC;`
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// Create your own query and describe it.
app.get("/RadoSarmiento_rdmo_operations2", async (req, res) => {
    try {
        const query = await pool.query(
            `SELECT	title, rating, f.length
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
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// STORED PROCEDURE & FUNCTIONS

// Create your own query and describe it.
app.get("/RadoSarmiento_fsp_operations1/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const query = await pool.query(
            `SELECT * FROM customertotalamount($1)`, [id]
        );
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

// Create your own query and describe it.
app.put("/RadoSarmiento_fsp_operations2/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const query = await pool.query(
            `CALL changecustomeremailto($1, $2)`, [id, data.email]
        );
        res.json({message: "Email Updated!"});
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Transaction Failed!" });
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
