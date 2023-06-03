const express = require('express')
const path = require('path')
const mysql = require('mysql')
const exphbs = require('express-handlebars')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')



app.get('/', (req, res)=> {
    res.render('home')
})



const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeMysql'
})

conn.connect(function(err){

    if(err){
        console.log(err)
    }

    console.log('banco de dados conectado.')
    
app.listen(3000, ()=> {
    console.log('server running...')
})
})






