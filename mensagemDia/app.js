
const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 3000
const API_URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {

    try {
        const response = await axios.get(API_URL)
        const quote = response.data[0]
        res.render('index', { quote, error: null })
    } catch (error) {
        console.error(err.message)
        res.render('index', { quote: null, error: 'Nao foi possivel acessar a API' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})