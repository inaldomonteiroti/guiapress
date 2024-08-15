const express = require('express'); // inicializando modulo já instalado express
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify"); // biblioteca que tranforma em slug url amigavel
const { RAW } = require('sequelize/lib/query-types');

router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGOS");
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories:categories});
    })
    
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    if(title != undefined){
        Article.create({
           title: title,
           slug: slugify(title), 
           body: body,
           categoryId: category
        }).then( ()=> {
            res.redirect("/admin/articles");
        })
       }else{
        res.redirect("./admin/articles/new");
       }
    });

    router.get("/admin/articles",(req,res)=>{

        Article.findAll({
            include:[{model: Category}]
        }).then(articles =>{
            res.render("./admin/articles/index", {articles:articles});
        })
        
    }); 
    
    router.post("/articles/delete", (req,res) =>{
        var id = req.body.id
        if (id != undefined){
            if (!isNaN(id)){ //se o id for um numero
                Article.destroy({
                    where:{
                        id:id
                    }
                }).then( ()=>{
                    res.redirect("/admin/articles");
                });
            }else{
                res.redirect("/admin/articles");
            }
        }else{//null
            res.redirect("/admin/articles")
        }
    })

module.exports = router;
