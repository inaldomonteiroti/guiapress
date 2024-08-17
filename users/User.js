const Sequelize = require('sequelize'); // importando sequelize
const connection = require("../database/database"); // carregando a conexao do banco

const User = connection.define('users',{
    email:{
        type:Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Category.sync({ force: true});

module.exports = User;