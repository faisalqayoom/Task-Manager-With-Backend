import React, { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { deleteTask, getData, postData, updateTask } from '../api/Api'
import { toast } from 'react-toastify'

export const TaskContext = createContext({
  tasks: [],
  addTask: () => { },
  deleteTask: () => { }
})

const TaskProvider = ({ children }) => {
  const [task, setTask] = useState([])

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const result = await getData()
        setTask([...result.data])
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllTasks()
  }, [])


  const handleOnAddTask = async (data) => {
    if (!data.id) {
      const taskData = { name: data.name, date: data.date, time: data.time, isCompleted: false }
      const result = await postData(taskData);
      setTask([result, ...task])
      toast.success('Task Added Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Data is Added Successfully .....")
    }
    else {
      const dataToUpdate = { name: data.name, date: data.date, time: data.time, isCompleted: false }
      const updateItem = await updateTask(data.id, dataToUpdate);

      const filtered = task.filter((item) => item._id !== updateItem.data._id)
      setTask([updateItem.data, ...filtered])
      toast.success('Task Updated Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Data is Updated Successfully .....")
    }
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const taskData = await deleteTask(id)
        const filteredTasks = task.filter((item) => item._id !== taskData.data._id)
        setTask(filteredTasks)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

  const handleOnComplete = async (data) => {
    const dataToUpdate = { name: data.name, date: data.date, time: data.time, isCompleted: true }
    const completedTask = await updateTask(data._id, dataToUpdate)
    const filtered = task.filter((item) => item._id !== completedTask.data._id)
    setTask([completedTask.data, ...filtered])
    toast.info('Task Completed!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  }

  return (
    <TaskContext.Provider
      value={{
        handleOnAddTask,
        task,
        handleOnDelete,
        handleOnComplete
      }}
    >,{children}
    </TaskContext.Provider >
  )
}

export default TaskProvider 
