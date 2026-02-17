require('dotenv').config()
const Game = require('./models/Game')

const express = require('express')

const cors = require('cors')


const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.json())

// Creeaza un joc nou
app.post('/games', async (req, res) => {
    try {
        const game = new Game()
        await game.save()
        res.json(game)
    } catch (err) {
        res.status(500).json({error: err.message })
    }
})


// ia un joc dupa ID
app.get('/games/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        if (!game) return res.status(404).json({ error: 'Jocul nu a fost gasit'})
        res.json(game)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


// actualizeaza jocul dupa o mutare
app.put('/games/:id', async (req, res) => {
    try {
        const {fen, moves, status, winner } = req.body
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            { fen, moves, status, winner},
            { new: true }
        )
        if (!game) return res.status(404).json({error: 'Jocul nu a fost gasit' })
        res.json(game)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Ia toate jocurile
app.get('/games', async (req, res) => {
    try {
        const games = await Game.find()
        res.json(games)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Conectare MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectat!'))
    .catch((err) => console.log('Eroare MongoDB:', err))


app.get('/', (req, res) => {
    res.send('Serverul functioneaza!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server pornit pe portul ${process.env.PORT}`)
})

