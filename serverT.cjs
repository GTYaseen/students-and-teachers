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

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors()); 

app.post('/api/saveTeacherData', async (req, res) => {
  try {
    const name=req.body.name
    const age=req.body.age
    const sp=req.body.sp
    await client.query('INSERT INTO teacher (teacherName, teacherAge, teacherSp) VALUES ($1, $2, $3)', [name,age,sp]);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving teacher data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/getTeacherData', async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM teacher ORDER BY id ASC');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    res.status(500).send('Internal Server Error');
  }
})
app.delete('/api/deleteTeacherData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await client.query('DELETE FROM teacher WHERE id = $1', [id]);
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Internal Server Error');
  }
})
app.put('/api/updateTeacherData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const sp = req.body.sp;
    await await client.query('UPDATE teacher SET teacherName = $1, teacherAge = $2, teacherSp = $3 WHERE id = $4', [name, age, sp, id]);
    res.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});