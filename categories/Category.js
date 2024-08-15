const Sequelize = require('sequelize'); // importando sequelize
const connection = require("../database/database"); // carregando a conexao do banco

const Category = connection.define('categories',{
    title:{
        type:Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

 //Category.sync({ force: true});

module.exports = Category;