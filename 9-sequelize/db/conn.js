const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodeorm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

})
//try {
   // sequelize.authenticate()
    //console.log('conectado com sequelize')

    
//} catch (error) {
//    console.log(error)
    
//}

module.exports = sequelize