import { useState } from "react"

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    const Header = ({ course }) => {
        return <h1>{course.name}</h1>
    }

    const Part = ({ name, exercises }) => {
        return (
            <p>{name} {exercises}</p>
        )
    }

    const Content = ({ course }) => {
        return (
            <div>
                <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
                <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
                <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
            </div>
        )
    }

    const Total = ({ course }) => {
        return (
            <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
        )
    }

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const Button = ({ onClick, text }) => {
        return (
            <button onClick={onClick}>
                {text}
            </button>
        )
    }

    const Line = ({ text, value }) => {
        return (
            <>
                <span>{text} {value}</span> <br />
            </>
        )
    }

    const Statistics = ({ good, neutral, bad, all}) => {
        if (all < 1) {
            return <span>No feedback given</span>
        }
        return (
            <>
                {good > 0 && <Line text='good' value={good} />}
                {neutral > 0 && <Line text='neutral' value={neutral} />}
                {bad > 0 && <Line text='bad' value={bad} />}
                <Line text='all' value={all} />
                <Line text='average' value={((good * 1) + (bad * -1)) / all } />
                <Line text='positive' value={good / all} />
            </>
        )
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />

            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text='good' />
            <Button onClick={() => setNeutral(neutral + 1)} text='netural' />
            <Button onClick={() => setBad(bad + 1)} text='bad' />
            <h1>statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={good + neutral + bad}
            />
        </div>
    )
}

export default App