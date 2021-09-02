import { useState } from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Display = ({ persons }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    )
}

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} />
        </div>
    )
}

const Form = ({ handleSubmit, name, number, setName, setNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                number: <input value={number} onChange={(event) => setNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        let check = persons.filter(person => person.name === newName)
        if (check.length > 0)
            alert(`${newName} is already added to phonebook`)
        if (newName !== '' && check.length === 0)
            setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewName('')
        setNewNumber('')
    }

    const personsToShow = (filter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add a new</h3>
            <Form handleSubmit={handleSubmit} name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber}/>
            <h3>Numbers</h3>
            <Display persons={personsToShow} />
        </div>
    )
}

export default App