const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// 1. Middlewares essenciais no topo
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dicionário de traduções para a v2
const mensagens = {
    'pt-br': 'Olá',
    'es': 'Hola',
    'en': 'Hello'
};

// Função para exibir logs no console
function registrarLog(req, outputJson) {
    const dataHora = new Date().toLocaleString();
    const endpoint = req.originalUrl || req.url;
    console.log(`[${dataHora}] | Endpoint: ${endpoint} | Saída: ${JSON.stringify(outputJson)}`);
}

// 2. Rota para carregar a página principal com o formulário HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// ==========================================
// VERSÃO 1 (v1)
// ==========================================

app.get('/v1/hi', function(req, res) {
    const out = { msg: "Hello, world!" };
    registrarLog(req, out);
    res.status(200).json(out);
});

app.post('/v1/hi', function(req, res) {
    const { name } = req.body;

    if (!name) {
        const err = { error: "Name is required" };
        registrarLog(req, err);
        return res.status(400).json(err);
    }

    const out = { msg: `Hello, ${name.toUpperCase()} from POST!` };
    registrarLog(req, out);
    res.status(200).json(out);
});

// ==========================================
// VERSÃO 2 (v2)
// ==========================================

// GET v2 com idioma na URL (ex: /v2/hi/pt-br)
app.get('/v2/hi/:lang', function(req, res) {
    const lang = req.params.lang.toLowerCase();

    if (!mensagens[lang]) {
        const err = { error: "Unsupported language. Use pt-br, es, or en." };
        registrarLog(req, err);
        return res.status(400).json(err);
    }

    const out = { msg: `${mensagens[lang]}, world!` };
    registrarLog(req, out);
    res.status(200).json(out);
});

// POST v2 recebendo dados do formulário
app.post('/v2/hi', function(req, res) {
    const { name, lang } = req.body;

    if (!name) {
        const err = { error: "Name is required" };
        registrarLog(req, err);
        return res.status(400).json(err);
    }

    const idioma = lang ? lang.toLowerCase() : 'pt-br';

    if (!mensagens[idioma]) {
        const err = { error: "Unsupported language. Use pt-br, es, or en." };
        registrarLog(req, err);
        return res.status(400).json(err);
    }

    const out = { msg: `${mensagens[idioma]}, ${name.toUpperCase()} from POST!` };
    registrarLog(req, out);
    res.status(200).json(out);
});

// 3. Rota coringa de erro 404 (deve ficar sempre por ÚLTIMO)
app.get('/*splat', function(req, res) {
    const err = { error: 'Invalid endpoint' };
    registrarLog(req, err);
    res.status(404).json(err);
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});