const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const PORT = process.env.PORT || 5174

app.use(cors());
app.use(express.json()); //=> allows us to access the req.body



//GET event
app.get("/events", async (req, res) => { 
    try {
        const allEvents = await pool.query("SELECT * FROM events")
        res.json(allEvents.rows);
    } catch (err) {
        console.log(err)
    }
})

//CREATE event
app.post('/events', async (req, res) => {
    try {
        const { section_name, cuisine_id } = req.body;
        const newSection = await pool.query(
            "INSERT INTO events (event_name, description, event_date, organizer) VALUES($1, $2, $3, $4) RETURNING *",
            [section_name, cuisine_id]
        );
        
        res.json(newSection);
    } catch (err) {
        console.log(err)
        log.error(err);
    }
})

//Get registered users for the event
app.get("/registered_users_for_event/:event_id", async (req, res) => {
    try {
        const { event_id } = req.params;
        const allEvents = await pool.query("SELECT * FROM users WHERE event_id = $1", [event_id])
        res.json(allEvents.rows);
    } catch (err) {
        console.log(err)
    }
})

//Registration on the event
app.post('/registrations', async (req, res) => {
    try {
        const { users_name, email, birth_date, where_hear, event_id } = req.body;
        const newRegistration = await pool.query(
            "INSERT INTO users (users_name, email, birth_date, where_hear, event_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [users_name, email, birth_date, where_hear, event_id]
        );
        
        console.log(newRegistration)
        // res.json(newRegistration);
    } catch (err) {
        console.log(err)
    }
})


// SELECT * FROM public.users 
// INSERT INTO users (users_name, email, birth_date, where_hear, event_id) VALUES ('Timothee Chalamet', 'chala@gmail.com', '27/12/1995', 'dou.ua', 1 )

app.listen(PORT, () => {
    console.log(`Life is Good : ${PORT}`); 
});
