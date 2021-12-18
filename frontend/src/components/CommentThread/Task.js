const Task = ({ task }) => {
  return (
    <div className="second">
      <h3>{task.Gname}</h3>
      <p> {task.comment}{' '}<span className="third">{task.date}</span></p>
    </div>
  )
}

export default Task
