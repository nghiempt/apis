const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//middleware
app.use(bodyParser.json());

//config connect
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api-nodejs',
    multipleStatements: true
})

//connect to MySQL
mysqlConnection.connect(err => {
    if (!err) {
        console.log('Connected to DB');
    } else {
        console.log('Connect Failed');
    }
})

//get all student
app.get('/student', (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

//get student by id
app.get('/student/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

//delete student by id
app.delete('/student/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM student WHERE id = ?', [req.params.id], err => {
        if (!err) {
            res.send('Deleted successfully');
        } else {
            console.log(err);
        }
    })
})

//insert student
app.post('/student', (req, res) => {
    let student = req.body;
    mysqlConnection.query('INSERT INTO student(id, name) VALUES (?, ?)', [student.id, student.name], err => {
        if (!err) {
            res.send('Inserted successfully');
        } else {
            console.log(err);
        }
    })
})

//update student
app.put('/student/:id', (req, res) => {
    let student = req.body;
    mysqlConnection.query('UPDATE student SET id = ?, name = ? WHERE id = ?', [student.id, student.name], err => {
        if (!err) {
            res.send('Updated successfully');
        } else {
            console.log(err);
        }
    })
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})