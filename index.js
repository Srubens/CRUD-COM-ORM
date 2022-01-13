const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

const model = require('./models/index')
const pessoas = require('./routes/pessoas')

app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})
app.use('/pessoas', pessoas)

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//{ force: true }
model.sequelize.sync().then(() =>{
    app.listen(port, ()=>{
        console.log('CRUD ORM NA PORTA 3000 🏆')
    })
})
