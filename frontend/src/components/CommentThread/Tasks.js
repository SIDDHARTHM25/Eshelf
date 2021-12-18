import Task from './Task'

const Tasks = ({ tasks }) => {
  console.log(tasks.data);
  return (
    <div className="First">
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  )
}

export default Tasks
