export const updateGame = async (gameId, moves, status) => {
    try {
        await fetch(`http://localhost:5000/games/${gameId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                moves,
                status,
                fen: 'custom'
            })
        })

    } catch (err) {
        console.error('Eroare salvare joc:', err)
    }
}