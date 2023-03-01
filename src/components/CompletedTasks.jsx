import React, { useContext } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TaskContext } from '../context/TaskProvider';


const CompletedTasks = () => {

  const { task, handleOnDelete } = useContext(TaskContext)

  return (
    <div>
      <p className='capitalize justify-center flex my-8 text-2xl font-semibold'>Completed Tasks</p>
      <div className=' flex flex-col h-56 gap-4 overflow-y-scroll'>
        {task && task?.map((item, i) => {
          if (item.isCompleted) {
            return (
              < p key={i} className=' card py-2 px-4 mx-5 flex line-through items-center text-[#808080]' >
                <BsFillCheckCircleFill className=' text-blue-500 mr-2' />
                {item.name}
                <span className='flex items-center ml-auto text-[22px]'>
                  <MdDeleteForever onClick={() => handleOnDelete(item._id)} className=" text-red-600 cursor-pointer" />
                </span></p>
            )
          }
        })}
      </div>
    </div >
  )
}

export default CompletedTasks