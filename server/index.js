const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "sql@2022",
        database: "bank"
      });

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/api/get', (req, res) => {
        const sqlGet = 'select * from transactions'
        db.query(sqlGet, (error, result) => {
                res.send(result)
        })
})

app.post('/api/post', (req, res) => {
        const {tId, tType, amount, acNo} = req.body
        const sqlInsert = 'insert into transactions (t_id, t_type, t_amount, ac_no) values (?, ?, ?, ?)'
        db.query(sqlInsert, [tId, tType, amount, acNo], (err, result) => {
                if (err) {
                        console.log(err)
                }
        })
})

app.delete('/api/remove/:id', (req, res) => {
        const {id} = req.params
        const sqlRemove = 'Delete from transactions where t_id = ?'
        db.query(sqlRemove, id, (err, result) => {
                if (err) {
                        console.log(err)
                }
        })
})

app.get('/api/get/:id', (req, res) => {
        const {id} = req.params
        const sqlGet = 'select * from transactions where t_id = ?'
        db.query(sqlGet, id, (error, result) => {
                if (error) {
                        console.log(error)
                }
                res.send(result)
        })
})

app.put('/api/put/:id', (req, res) => {
        const {id} = req.params
        const {tId, tType, amount, acNo} = req.body
        const sqlUpdate = 'update transactions set t_id = ?, t_type = ?, t_amount = ?, ac_no = ? where t_id = ?'
        db.query(sqlGet, [tId, tType, amount, acNo], (error, result) => {
                if (error) {
                        console.log(error)
                }
                res.send(result)
        })
})



app.listen(5000, () => {
        console.log('server is running on port 5000');
})