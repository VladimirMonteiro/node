const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

//MODELS
const User = require('./models/User')
const Address = require('./models/Address')
const { where } = require('sequelize')




app.engine('handlebars', exhbs.engine())
app.set('view engine', 'handlebars')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))






app.get('/users/create', (req,res)=> {
    res.render('adduser')
})

app.post('/users/create', (req,res)=> {
    
   const name = req.body.name
   const occupation = req.body.occupation
   let newsletter = req.body.newsletter

    if(newsletter === "on"){
        newsletter = true
    }
    else{
        newsletter = false
    }
    
    console.log(req.body)
    
    User.create({name, occupation, newsletter})

    
    res.redirect('/')
})

app.get('/users/:id', async (req, res)=> {

    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('userview', {user})
})


app.post('/users/delete/:id', async (req, res)=> {
    
    const id = req.params.id
    console.log(req.params)

     await User.destroy({where:{id: id}})

     res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {

    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})
    
    if(user.newsletter === 1) {
        user.newsletter = true
    }
    else{
        user.newsletter == false
    }

    res.render('useredit', { user })

})

app.post('/users/edit', async(req, res) => {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

     
    if(newsletter === 'on') {
        newsletter = true
    }
    else{
        newsletter == false
    }

    const user = {
        id,
        name,
        occupation,
        newsletter
    }


    await User.update(user, {where: {id: id}})

    res.redirect('/')




})

app.post('/address/create' , async (req, res) => {
    const userId = req.body.UserId
    const street = req.body.Street
    const number = req.body.number
    const city = req.body.city

    const address = {
        userId,
        street,
        number,
        city
    }

    await Address.create(address)

    res.redirect(`/users/edit/${userIdserId}`)

})

app.get('/',async (req,res)=> {

    const users = await User.findAll({raw: true})

    console.log(users)
    res.render('home', {users})
})




conn.sync().then(()=> {
    console.log('Conectado ao banco de dados')

    app.listen(3000, ()=> {
        console.log('server running...')
    })

}).catch((err) => console.log(err))


