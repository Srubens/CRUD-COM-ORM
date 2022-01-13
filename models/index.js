const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root', '',{
    dialect:'mysql',
    host:'localhost'
})
const models = {}
const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) =>{
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    models[model.name] = model
    console.log(model.name)
  })
  Object.keys(models).forEach(modelName =>{
    if('associate' in models[modelName]){
      models[modelName].associate(models)
    }
  })


module.exports = {
    sequelize,
    models
}

//const pessoa = sequelize.import('./pessoa.js')

// const Pessoa = sequelize.define('Pessoa',{
//     nome:Sequelize.STRING,
//     cargo:Sequelize.STRING
// })

//sequelize.sync().then(()=> console.log('synced') )

//PARA VER SE FOI TUDO CONECTADO CORRETAMENTE
/*sequelize.authenticate()
    .then(()=>{ console.log('auth') })
*/