import React, { useContext } from 'react'
import CompletedTasks from './CompletedTasks';
import UpcomingTasks from './UpcomingTasks';
import { TaskContext } from '../context/TaskProvider'
import { useForm } from "react-hook-form";
import { getSingleTask } from '../api/Api';

const Form = () => {
  const { register, handleSubmit, reset } = useForm({ shouldUseNativeValidation: true });
  const { handleOnAddTask } = useContext(TaskContext)

  const onSubmit = (data) => {
    handleOnAddTask(data);
    reset();
  }

  const handleOnEdit = async (id, data) => {
    reset({
      id: id,
      name: data.name,
      date: data.date,
      time: data.time,
    });
  };


  return (
    <div className=''>
      <div className="grid grid-cols-5 p-5 gap-6 mx-10 mt-10">
        <div className="card col-span-2 max-h-96">
          <p className=' capitalize justify-center flex my-8 text-2xl font-semibold'>task manager</p>
          <form className='  mt-5 px-10 inline-block ' onSubmit={handleSubmit(onSubmit)}>
            <input className='card outline-none py-2 px-4 bg-transparent w-full' placeholder='Enter Your Task' name="name"
              {...register("name", { required: "Please enter your task." })}
            />
            <input className='card outline-none py-2 px-4 bg-transparent mt-6 w-full' placeholder='Enter Date' name="date"
              {...register("date", { required: "Please enter your task." })}
            />
            <input className='card outline-none py-2 px-4 bg-transparent mt-6 mb-10 w-full' placeholder='Enter Time' name="time"
              {...register("time", { required: "Please enter your task." })}
            />
            <div className=' flex '>
              <button type='reset' className=' card px-12 mb-5 py-1 '>Clear</button>
              <input className=' card flex px-12 mb-5 py-1 ml-auto cursor-pointer' type="submit" />
            </div>
          </form>
        </div>
        <div className=" card col-span-3 ">
          <UpcomingTasks handleOnEdit={handleOnEdit} />
          <CompletedTasks />
        </div>
      </div>
    </div>
  )
}

export default Form