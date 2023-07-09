//Define the route handlers
const express = require('express');
const studentData = require('./studentData.json');

//Create an instance of an Express application
const app = express();

//Define routes
//Home
app.get('/', (req, res) => {
  res.status(200).json({ data: 'App Running!' });
});

//Students
app.get('/students', (req, res) => {
  try {
    const students = { studentData };
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Student Individual
app.get('/students/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { students } = studentData;
    const student = students.find((student) => student.id === id);
    if (student) {
      res.status(200).json({ data: student });
    } else {
      res.status(404).json({ error: `No Student with id of ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Error Route
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//Export
module.exports = app;
