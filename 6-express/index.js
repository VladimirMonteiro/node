const express = require('express')
const path = require('path')
const app = express()



const basePath = path.join(__dirname, "tamplates")



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))




app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/cadastro.html`)
})

app.post('/users/save', (req, res) => {
    const {name, age} = req.body

    console.log(`Name: ${name}\nAge: ${age}`)

})

app.get('/', (req, res)=> {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})




app.listen(4000, ()=> {
    console.log('Server done!!')
})