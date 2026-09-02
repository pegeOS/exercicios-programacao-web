
const express = require('express')
const app = express()
const port = 4000


app.use((req, res, next) => {
    console.log(`Página acessada: ${req.url}`)
    next()
})


const meuMiddleware = (nomeDaPagina) => {
    return (req, res) => {
        res.send(`Você está na página ${nomeDaPagina}`)
    }
}

app.get('/', meuMiddleware('inicial'))
app.get('/about', meuMiddleware('sobre'))
app.post('/data', meuMiddleware('data'))
app.get('/users', meuMiddleware('users'))


app.get('/users/signin', (req, res) => {
    res.redirect('/users/signup')
})

app.get('/users/signup', (req, res) => {
    res.send("Digite seu nome de usuário na URL após o users/")
})


app.get('/users/:userid', (req, res) => {
    const userid = req.params.userid
    res.send(`Bem-vindo ${userid}!`)
})


app.use((req, res) => {
    res.status(404).send('Página não encontrada <a href="/">Ir para a página inicial</a>')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})