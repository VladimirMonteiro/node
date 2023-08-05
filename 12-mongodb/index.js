const express = require('express')
const exhps = require('express-handlebars')
const path = require('path')

const app = express()


const conn = require('./db/conn')



app.engine('handlebars', exhps.engine())
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))
app.use(express.json())


const productRoutes = require('./routes/productsRoutes')


app.use('/products', productRoutes)

app.listen(3000, ()=> {
    console.log('Server running...')
} )