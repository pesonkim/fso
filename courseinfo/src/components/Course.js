const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </>
    )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
    const sum = parts.reduce((a, b) => a + b.exercises, 0)
    return (
        <strong>total of {sum} exercises</strong>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;