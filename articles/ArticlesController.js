const express = require('express'); // inicializando modulo já instalado express
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGOS");
});

router.get("/admin/articles/new", (req, res) => {
    res.send("ROTA PARA CRIAR UMA NOVA ARTIGOS");
});

module.exports = router;
