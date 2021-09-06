import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()
    const inputRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        const content = inputRef.current.value        
        inputRef.current.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="anecdote" ref={inputRef}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote