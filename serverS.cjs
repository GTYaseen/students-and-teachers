const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kataki',
  password: '77565155',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// POST endpoint to save student data
app.post('/api/saveStudentData', async (req, res) => {
  try {
    const name=req.body.name
    const age=req.body.age
    const grade=req.body.grade
    await client.query('INSERT INTO student (studentName, studentAge, studentGrade) VALUES ($1, $2, $3)', [name,age,grade]);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving student data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/getStudentData', async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM student');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error('Error fetching Student data:', error);
    res.status(500).send('Internal Server Error');
  }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
