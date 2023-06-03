const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


const app = express()
//Configuração handlebars caso queira usar partials
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

//Configuração handlebars
app.engine("handlebars", hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))




app.get('/blog', (req, res)=> {
    const posts = [{
        title: "aprender node js",
        category: "js",
        body: 'teste',
        comments: 4


    },
    {title: "aprender PHP",
        category: "php",
        body: 'APRENDENDO PHP ',
        comments: 4
 }]

 res.render('blog', {posts})


})



app.get('/posts', (req, res)=> {

    const post = {
        title: 'Node JS',
        category: 'programaçao',
        body: 'aprendendo node js',
        comments: 4
    }

    res.render('posts', {post})
})



app.get('/dashboard', (req, res)=>  {
    
    const items = ["item a", "item b", "item c"]
    
    
    
    res.render('dashboard', {items})
})




app.get('/', (req, res) => {
    
    const user = {
        name: 'Vladimir',
        surname: 'Monteiro'
    }

    const auth = false
    const approved = false
    
    
    
    res.render('home', {user: user, auth, approved})

})




app.listen(3000, ()=> {
    console.log('Server running...')
})