import React, { useContext } from 'react'
import { MdDeleteForever, MdDownloadDone, MdEditCalendar, MdAccessAlarms } from "react-icons/md";
import { BsRecordCircleFill } from "react-icons/bs";
import moment from 'moment/moment';
import { TaskContext } from '../context/TaskProvider';

const UpcomingTasks = ({ handleOnEdit }) => {
  const { task, handleOnDelete, handleOnComplete } = useContext(TaskContext)

  return (
    <div>
      <p className='capitalize justify-center flex my-8 text-2xl font-semibold'>Upcoming Tasks</p>
      <div className=' flex flex-col h-56 gap-4 overflow-y-scroll'>
        {task && task?.map((item, i) => {
          // const dateIn = moment(task.date).format("L");
          // const TimeIn = moment(task.date).format("LT");
          if (!item.isCompleted) {

            return (
              < p key={i} className=' card py-2 px-3 mx-5 flex items-center' >
                <BsRecordCircleFill className=' text-blue-500 mr-2' />
                {item.name}
                <span className='flex items-center ml-auto text-[22px]'>
                  <span className='flex shadow-none px-2 bg-slate-200 rounded-lg mr-1'>
                    <MdAccessAlarms className=' text-teal-500 mr-1 text-lg' />
                    <p className='  text-sm mr-1'>{item.time} | {item.date && item.date.slice(0, 10)}</p>
                  </span> <MdDeleteForever onClick={() => handleOnDelete(item._id)} className=" text-red-600 cursor-pointer" />
                  <MdDownloadDone onClick={() => handleOnComplete(item)} className='mx-1 cursor-pointer' />
                  <MdEditCalendar onClick={() => handleOnEdit(item._id, { name: item.name, date: item.date, time: item.time })} className=' text-orange-600 cursor-pointer' /></span></p>
            )
          }
        })}
      </div>
    </div >
  )
}

export default UpcomingTasks


// const dateIn = moment(task[0].date).format("L")
  // const TimeIn = moment(task[0].date).format("LT")
  // console.log('dateIn', dateIn)
  // console.log('TimeIn', TimeIn)