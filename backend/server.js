const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();


app.use(cors());

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost', 
    database: 'NEW', 
    password: 'ViNaY@9014',
    port: 5432 
});

app.get('/', async (req, res) => {
    try {
       
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM information');
        const rows = result.rows;

        
        res.json(rows);

        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
