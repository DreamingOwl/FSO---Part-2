const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.map(part => part.exercises).reduce((total, exercises) => total + exercises)} />
      </div>
    )
}

const Header = ({ course }) => <h2>
                                    {course}
                                </h2>

const Total = ({ sum }) => <p>
                                <b>total of {sum} exercises</b>
                           </p>

const Part = ({ part }) =>  <p>
                                {part.name} {part.exercises}
                            </p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

export default Course