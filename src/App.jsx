import { ToastContainer } from 'react-toastify'
import './App.css'
import Form from './components/Form'
import TaskProvider from './context/TaskProvider'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <TaskProvider>
        <div className=" bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 px-10">
          <Form />
        </div>
      </TaskProvider>
    </div>
  )
}


export default App
