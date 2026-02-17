const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    players: {
        white: { type: String, default: 'Player 1' },
        black: { type: String, default: 'Player 2' }
    },
    fen: { type: String, default: 'start' },
    moves: { type: [String], default: [] },
    status: { type: String, default: 'active' },
    winner: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Game', GameSchema)