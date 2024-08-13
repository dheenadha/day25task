import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Card from './components/Card'
import data from './utils/Data'

function App() {
  
    const [taskdata,setTaskData] = useState([])
    const url = "https://662ce3830547cdcde9df662d.mockapi.io/user"
    const getData = async ()=>{
        let data = await fetch(url)
        let res = await data.json()
        console.log(res)
        setTaskData(res)
        console.log(taskdata)
    }
  return (
    <>
      <div className='container'>
        <h4 className='text-success text-center mt-3'>MyTodo</h4>
        <AddTodo taskData={taskdata} setTaskData={setTaskData} />
        <div>
        <div className='filter d-flex flex-wrap justify-content-between'>
          <h6 className='m-1'>My Todos</h6>
          
          <div className='d-flex' >
            <h6 className='m-1'>Status Filter:</h6>
            <div className="dropdown">
              <button className="btn btn-sm btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                All 
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="www.google.com">All</a></li>
                <li><a className="dropdown-item" href="/">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
          </div>
        </div>
        <div className='cardArea d-flex flex-wrap gap-4 mt-2 '>
          {getData()}
          {taskdata.map((element)=><Card {...element} />)}
        </div>
      </div>
    </>
  )
}

export default App
