import { useEffect, useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import {Card} from './components/Card'

function App() {

    // useState Variable
    const [taskdata,setTaskData] = useState([])
    // endpoint
    const url = "https://662ce3830547cdcde9df662d.mockapi.io/user"
    // to filter the data (dropdown)
    const [filter,setFilter] = useState('all')
    // styling for drop down
    const filterStyle = (filter=="All")?{backgroundColor : "orange"}:(filter=="Completed")?{backgroundColor : "green"}:{backgroundColor : "red"}
    // Read Operation
    const getData = async ()=>{
        let data = await fetch(url)
        let res = await data.json()
        // console.log(res)
        setTaskData(res)
        // console.log(taskdata)
    }
    // handleFilter
    const handleFilter=async(f)=>{
        let data = await fetch(url)
        let res = await data.json()
        if(f=='All'){
          setTaskData(res)
          setFilter('All')
        } else if (f=='Completed'){
          // copying all todo whose status is completed
          var cArr = []
          setFilter('Completed')
            res.map((e)=>{
              console.log("e",e)
              if(e.status){
                cArr.push(e)
              }})
              console.log(cArr)
              setTaskData(cArr)
        } else {
          var ncArr = []
          setFilter('NotCompleted')
            res.map((e)=>{if(!e.status){ncArr.push(e)}})
              setTaskData(ncArr)
        }
        
    }
    // render every time the filter changes
    useEffect(()=>{getData()},[])
  return (
    <>
      <div className='container'>
        <h4 className='text-success text-center mt-3'>MyTodo</h4>
        <AddTodo url={url} taskData={taskdata} setTaskData={setTaskData} />
        <div>
        <div className='filter d-flex flex-wrap justify-content-between'>
          <h6 className='m-1'>My Todos</h6>
          <div className='d-flex' >
            <h6 className='m-1'>Status Filter:</h6>
            <div className="dropdown">
                <button className="btn btn-sm dropdown-toggle m" style={filterStyle} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className='text-light'>{filter}</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item btn-primary" onClick={()=>handleFilter('All')}>All</a></li>
                  <li><a className="dropdown-item btn-success" onClick={()=>handleFilter("Completed")}>Completed</a></li>
                  <li><a className="dropdown-item" onClick={()=>handleFilter("NotCompleted")}>Not Completed</a></li>
                </ul>
            </div>
          </div>
          </div>
        </div>
        {/* {console.log(filter)} */}
        <div className='cardArea d-flex flex-wrap gap-4 mt-2 '>
         {taskdata.map((element,i)=><Card key={i} {...element} url={url} taskData={taskdata} setTaskData={setTaskData}/>)}
        </div>
    </div>
    </>
  )
}

export default App
