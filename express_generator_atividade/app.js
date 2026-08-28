var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var aboutRouter = require('./routes/about');

const port = 3000;
var app = express();

// 1. Configuração da View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 2. Middlewares Globais (devem vir ANTES das rotas)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de log personalizado (agora é executado para todas as requisições)
app.use((req, res, next) => {
    console.log(`Página acessada: ${req.url}`);
    next();
});

// 3. Rotas Específicas
app.get('/users/signin', (req, res) => {
    res.redirect('/users/signup');
});

app.get('/users/signup', (req, res) => {
    res.send("Digite seu nome de usuário na URL após o users/");
});

app.get('/users/:userid', (req, res) => {
    const userid = req.params.userid;
    res.send(`Bem-vindo ${userid}!`);
});

// Roteadores do Express
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);

// 4. Tratamento de página não encontrada (404)
app.use((req, res, next) => {
    next(createError(404));
});

// 5. Manipulador de Erros
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

// 6. Inicialização do Servidor (apenas uma vez)
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
