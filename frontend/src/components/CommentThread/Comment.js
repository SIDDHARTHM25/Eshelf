import { useState } from 'react'

const AddTask = ({ onAdd, usercookie, props }) => {
  //const [name, setName] = useState('Jay')
  const [comm, setComm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!comm) {
      alert('Please add a comment')
      return
    }
    console.log("Comment is ", comm, usercookie.name, props.bookID);
    onAdd({ comment: comm, Gname: usercookie.name, GID: usercookie.GID, docID: props.bookID })
    //  setName('')
    setComm('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Comments</label>
        <input
          className='add'
          type='text'
          placeholder='Add Comment'
          value={comm}
          onChange={(e) => setComm(e.target.value)}
        />
      </div>
      <input type='submit' value='Add Comment' className='btn btn-block' />
    </form>
  )
}

export default AddTask
