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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    console.log(`Página acessada: ${req.url}`);
    next();
});


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


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);


app.use((req, res, next) => {
    next(createError(404));
});


app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
