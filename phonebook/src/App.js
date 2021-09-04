import { useEffect, useState } from 'react'

import contactService from './services/contacts'

const Person = ({ name, number, handleDelete }) => {
    return (
        <div>
            {name} {number} <button onClick={handleDelete}>delete</button>
        </div>
    )
}

const Display = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)} />
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

const Notification = ({ message }) => {
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        contactService
            .getAll()
            .then(contacts => {
                setPersons(contacts)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        let check = persons.filter(person => person.name === newName)
        console.log(check)
        if (check.length > 0) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                contactService
                    .update(check[0].id, { ...check[0], number: newNumber })
                    .then(returned => {
                        setPersons(persons.map(note => note.id === check[0].id ? returned : note))
                        setErrorMessage(
                            `Updated contact '${newName}'`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(error.response.data.error)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        }
        if (newName !== '' && check.length === 0) {
            contactService
                .create({ name: newName, number: newNumber })
                .then(response => {
                    setPersons(persons.concat(response))
                    setErrorMessage(
                        `Added contact '${newName}'`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }

    const handleDeleteOf = (id) => {
        const name = persons.find(n => n.id === id)

        if (window.confirm(`Delete ${name.name} ?`)) {
            contactService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    setErrorMessage(
                        `Removed contact '${name.name}'`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setPersons(persons.filter(person => person.id !== id))
                    setErrorMessage(
                        `Contact '${name.name}' was already removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }

    const personsToShow = (filter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add a new</h3>
            <Form handleSubmit={handleSubmit} name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber} />
            <h3>Numbers</h3>
            <Display persons={personsToShow} handleDelete={handleDeleteOf} />
        </div>
    )
}

export default App
