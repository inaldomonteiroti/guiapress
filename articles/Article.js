const Sequelize = require('sequelize'); // importando sequelize
const connection = require("../database/database"); // carregando a conexao do banco
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type:Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article); // Uma categoria tem muitos artigos 1 X N
Article.belongsTo(Category); // Um artigo pertence a uma categoria 1 x 1
//Se vc quisesse simplificar bastava ter um deles

//Atualizar banco de dados
// Article.sync({ force: true});

module.exports = Article;