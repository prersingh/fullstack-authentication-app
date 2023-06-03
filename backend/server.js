const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'authsignup',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/signup', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO login (name, email) VALUES (?, ?)';
    const values = [name, email];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).json('Error inserting data');
      }
  
      return res.json('Success');
    });
});


const port = 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
