const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')



const app = express()

const conn = require('./db/conn')
const Task = require('./models/Task')


const tasksRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')





app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/tasks', tasksRoutes)








conn.sync().then(()=>{
    app.listen(3000, ()=> {
        console.log('Server Running...')
    })

}).catch(error => console.log(error))


