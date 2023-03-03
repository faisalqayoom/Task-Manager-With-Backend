import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


axios.interceptors.response.use(config => {
  // console.log("Response received");
  return config;
}, error => {
  return Promise.reject(error);
});


//! GET SINGLE TASK   

export const getSingleTask = async (id) => {
  try {
    const getSingleTask = { method: 'GET', url: `task/${id}` };
    const response = await axios(getSingleTask)
    console.log("isCompleted", response)
    const taskCompleted = response.isCompleted = true
    console.log("isCompleted", taskCompleted)
    return response.data.data
  }
  catch (error) {
    console.log(error)
  }
}


//! GET DATA  

export const getData = async () => {
  try {
    const getAllTasks = { method: 'GET', url: `task` };
    const response = await axios(getAllTasks)
    return response.data
  }
  catch (error) {
    console.log(error)
  }
}


//! Post Request  

export const postData = async (taskData) => {
  try {
    const createTask = {
      method: 'POST', url: 'task', data: {
        name: taskData.name,
        date: taskData.date,
        time: taskData.time
      }
    };
    const response = await axios(createTask);
    console.log('response.data', response?.data?.data);
    return response?.data?.data
  }
  catch (error) {
    console.error(error);
  }
}

//! Update Task   

export const updateTask = async (id, data) => {
  try {
    const update = {
      method: 'PUT',
      url: `task/${id}`,
      data: { id: id, name: data.name, date: data.date, time: data.time, isCompleted: data.isCompleted }
    };

    const response = await axios.request(update);
    return response.data
  }
  catch (error) {
    console.log(error.message)
  }
}



export const deleteTask = async (id) => {
  try {
    const options = {
      method: 'DELETE',
      url: `task/${id}`,
      data: id
    };

    const response = await axios.request(options)
    return response.data
  }
  catch (error) {
    console.log(error.message)
  }
}






























//!Get Data
// export const getTasks = async () => {
//   const res = await fetch('http://localhost:3001/api/task', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const result = await res.json()
//   console.log('The result the fetched tasks:', result.data)
//   return result.data;
// }

// //! Add Task

// export const saveTask = async (task) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var raw = JSON.stringify({
//     "name": task
//   });

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   const apiUrl = process.env.REACT_APP_API_BASE_URL
//   const response = await fetch(apiUrl / task, requestOptions);
//   if (response.ok) {
//     const res = await response.json();
//     console.log(res)
//     return res;
//   }
// }
// saveTask()


// //!Update Task

// export const updateTask = async (id, task) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify(task);

//   var requestOptions = {
//     method: 'PUT',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
//   const response = await fetch(`http://localhost:3001/api/task/${id}`, requestOptions)
//   if (response.ok) {
//     const res = await response.json()
//     return res
//   }
// }

// //! Delete Task

// export const deleteTask = async (itemId) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   // const id = '63f2029b3ff682d224ae19bc'

//   var raw = JSON.stringify({
//     "_id": itemId
//   });

//   var requestOptions = {
//     method: 'DELETE',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
//   const res = await fetch(`http://localhost:3001/api/task/${itemId}`, requestOptions)
//   if (res.ok) {
//     const result = await res.json()
//     return result
//   }
// }

// export const getSingleTask = async (id) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     "_id": id,
//     "isCompleted": true
//   });

//   var requestOptions = {
//     method: 'PUT',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   const resp = await fetch(`http://localhost:3001/api/task/${id}`, requestOptions)
//   if (resp.ok) {
//     const result = await resp.json()
//     return result
//   }
// }