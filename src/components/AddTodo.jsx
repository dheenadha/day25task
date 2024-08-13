import React from 'react'
import { useState } from 'react'

const AddTodo = ({url,taskData,setTaskData}) => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    
    // get
    const getData = async ()=>{
      let data = await fetch(url)
      let res = await data.json()
      // console.log(res)
      setTaskData(res)
    }
    // update
    const handleClick =async(name,description)=>{
      setName("")
      setDescription("")
        if(name!='' && description!=''){
            let detail = {name:name,description:description,status:false}
            let data = await fetch(`${url}`,{method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(detail)})
              let res =await data.json()
            
              getData()
        } else {
          alert("Fields cannot be empty")
        }      
    }
  return (
    <>
        <div className='row m-4'>
            <input className='col-4 border border-success' type="text" value={name} name="name" onChange={(e)=>setName(e.target.value)}  placeholder='Todo Name'/>
            {/* create d-flex d-wrap justify-content-around m-3 */}
            <span className='col-1'/>
            <input className='col-4 border border-success' type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Todo Description' />
            <span className='col-1'/>
            <input className="btn btn-success col-2"  type="submit" value="Add Todo" onClick={()=>handleClick(name,description)} />
        </div>
    </>
  )
}

export default AddTodo