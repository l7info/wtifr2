//simple express server to run frontend production build;
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Configuração CORS para permitir acesso cross-domain
app.use(cors({
    origin: '*', // Permite qualquer origem
    credentials: true // Permite cookies e credenciais
}));

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(3250);

