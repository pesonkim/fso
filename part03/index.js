require('dotenv').config()

const express = require('express')
const app = express()
const Note = require('./models/note')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch((error) => {
            response.json({'error': error.message})
        })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    console.log(body)

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(note => {
        response.json(note)
    })
    .catch((error) => {
        response.json({'error': error.message})
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
