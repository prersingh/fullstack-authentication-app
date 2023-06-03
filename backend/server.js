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


app.get('/user/:email', (req, res) => {
    const userEmail = req.params.email;
    const sql = 'SELECT name, email FROM login WHERE email = ?';
  
    db.query(sql, [userEmail], (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json('Error querying the database');
      }
  
      if (result.length > 0) {
        const userData = {
          name: result[0].name,
          email: result[0].email,
        };
        return res.json(userData);
      } else {
        return res.status(404).json('User not found');
      }
    });
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

app.post('/login', (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM login WHERE email = ?';
  
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json('Error querying the database');
      }
  
      if (result.length > 0) {
        return res.json('Success');
      } else {
        return res.json('Failed');
      }
    });
  });

const port = 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
