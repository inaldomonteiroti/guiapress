const express = require('express'); // inicializando modulo já instalado express
const app = express(); // criando uma instancia do express
const bodyParser = require("body-parser"); // carregando modulo que faz envio de formularios
const connection = require("./database/database"); // carregando a conexao do banco
const categoriesController = require("./categories/CategoriesController"); //carregando arquivos de rotas
const articlesController = require("./articles/ArticlesController"); // carregando arquivos de rotas 

//Importando Models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//arquivos staticos
app.use(express.static('public'));

//Criando uma rota principal
app.get("/", (req,res) => {
    res.render("index");
})

//Database com promisses then e catch
connection
    .authenticate()
    .then(() => {
        console.log( "Conexão com banco feita com sucesso ! ");
    }).catch((error)=>{
        console.log(" Erro de conexao com o banco -> verificar database");
    })


app.use("/", categoriesController); // prefixo mais rotas
app.use("/", articlesController); // prefixo mais rotas

app.listen(3000, ()=> {
    console.log ("O servidor esta rodando na porta 3000 !");
})