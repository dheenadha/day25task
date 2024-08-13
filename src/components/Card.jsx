import React, { useEffect, useState } from 'react'

export const Card = ({name,description,status,id,url,taskdata,setTaskData}) => {
  // console.log("Status-",status,id)
  const [newName,setNewName] = useState(name)
  const [newDesc,setNewDesc] = useState(description)
  const [newStatus,setNewStatus] = useState(status)
    // get/read
    const getData = async ()=>{
      let data = await fetch(url)
      let res = await data.json()
      // console.log(res)
      setTaskData(res)
    }
    // delete
    const handleDelete = async(id)=>{
        console.log(id)
        let data = await fetch(`${url}/${id}`,{
          method:"DELETE"
        })
        let res =await data.json()
        getData()
    }
    
    // edit
    const [edit,setEdit] = useState(false)
    const handleEdit = ()=>{
      setEdit(!edit)
      
    }
    
    // update
    const handleUpdate =async(id,newName,newDesc,newStatus)=>{
      var s = newStatus=='false'?false:true
      let updateDetail = {name :newName,description:newDesc,status:s}
      let data = await fetch(`${url}/${id}`,{method:"PUT",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(updateDetail)})
      let res =await data.json()
      setEdit(!edit)
      getData()
    }
    
  return (
    <>
        <div className="card mt-2" style={{width: "20rem"}}>
        <div className="card-body">
        <p className="card-text">Name : {edit?<input type="text" name="" id="" value={newName} onChange={(e)=>setNewName(e.target.value)} />:name}</p>
            <p className="card-text">Description : {edit?<input type="text" name="" id="" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)}/>:description}</p>
            <p className="card-text">Status : {edit?<input type="text" name="" id="" value={newStatus} onChange={(e)=>setNewStatus(e.target.value)} />:status?"Completed":"NotCompleted"}</p>
            
            <div className='d-flex flex-wrap justify-content-end'>
            {edit?<button className="btn btn-success m-1" onClick={()=>setEdit(!edit)}>Back</button>:''}
            {edit?<button className="btn btn-success m-1" onClick={()=>handleUpdate(id,newName,newDesc,newStatus)}>Update</button>:<button className="btn btn-success m-1" onClick={()=>handleEdit()}>Edit</button>}
            <button className="btn btn-danger m-1" onClick={()=>handleDelete(id)}>Delete</button>
            </div>
        </div>
        </div>
        
    </>
  )
}

