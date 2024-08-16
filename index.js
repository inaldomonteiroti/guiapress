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

    Article.findAll({
        order:[
           ['id','DESC'] 
        ]
    }).then(articles =>{
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})

//Criando rota para o leia mais com slug
app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

//Criando rota para buscar uma categoria especifica e seus artigos

app.get("/category/:slug",(req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
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