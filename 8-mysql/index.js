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





app.get('/books', (req, res)=> {
    const sql = "SELECT * FROM books"
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const books = data
        console.log(books)

        res.render('books', {books})

    })
})

app.get('/book/:id', (req,res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){

        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res)=> {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        console.log(data)

        res.render('bookedit', {book})
    })
})


app.post('/book/updatebook', (req, res)=> {
    const {id, title, pages} = req.body

    const sql = `UPDATE books SET titulo = '${title}', paginas = '${pages}' WHERE id = ${id}`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.post('/books/insertbook', (req, res)=> {
    const {title, pages} = req.body

    const sql = `INSERT INTO books (titulo, paginas) VALUES ('${title}', '${pages}') `

    conn.query(sql, function(err){
        
        if(err){
            console.log(err)
        }

        res.redirect('/books')
    })
})



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






