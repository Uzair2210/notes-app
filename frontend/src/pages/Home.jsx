import React, { useState,useEffect,useRef } from "react";

const Home = () => {


  var [notes, setNotes] = useState([]);
  var [loadAgain,setLoadAgain] = useState(false)

  var titleInputTag = useRef()



  const fetchNotes = async () =>{
    var res = await fetch('https://notes-app-ruddy-two.vercel.app/api/notes')
    res = await res.json()

    setNotes(res.message)
  }
  
  useEffect(()=>{
    fetchNotes()
  },[loadAgain])


  var [title,setTitle] = useState('')
  var [desc,setDesc] = useState('')


  const submitHandler =async (e) =>{
    e.preventDefault()
    var res = await fetch('https://notes-app-ruddy-two.vercel.app/api/notes',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({title,desc})
    })

    res = await res.json()

    if(res.success){
      setDesc("")
      setTitle("")
      setLoadAgain(!loadAgain)
    }else{
      alert(res.message)
    }


  }


  async function deleteNotes(id){
    var res = await fetch(`https://notes-app-ruddy-two.vercel.app/api/notes/${id}`,{
      method:"DELETE"
    })
    var jsonRes = await res.json()

    if(jsonRes.success){
      setLoadAgain(!loadAgain)
    }
  }


  // For Updation

  var [updateMode,setUpdateMode] = useState(false)
  var [notesID,setNotesID] = useState('')
  function setDataInForm(data){
    setTitle(data.title)
    setDesc(data.desc)
    titleInputTag.current.focus()
    setUpdateMode(true)
    setNotesID(data._id)
  }

  async function updateNotes(e){
    e.preventDefault()
    var res = await fetch(`https://notes-app-ruddy-two.vercel.app/api/notes/${notesID}`,{
      method:"PUT",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({title,desc})
    })
    var jsonRes = await res.json()
    
    if(jsonRes.success){
      setDesc("")
      setTitle("")
      setLoadAgain(!loadAgain)
      setUpdateMode(false)
      setNotesID("")
    }else{
      alert(res.message)
    }

  }


  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={updateMode ? updateNotes : submitHandler} className="border-[1px] border-gray-200 my-10 p-4">
        <h2 className="text-2xl font-semibold mb-4">
        {updateMode ? "Update":"Add"} <span className="text-[#19d4ca]">Notes</span>
        </h2>

        <input
          ref={titleInputTag}
          className="block focus:outline-[#19d4ca] w-full border-[1px] p-2 rounded-sm mb-2 border-gray-300"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
        <textarea
          className="block focus:outline-[#19d4ca] w-full border-[1px] p-2 mb-2 rounded-sm border-gray-300"
          placeholder="Description"
          required
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />

        <button className="py-1 px-2 bg-[#19d4ca] rounded-sm text-white">
          {updateMode ? "Update":"Submit"}
        </button>
      </form>

      <div>
        {notes.map((v,i) => {
          return (
            <div key={v._id} className="shadow-lg p-4 my-4">
              <h2 className="mb-1 font-semibold">{v.title}</h2>
              <p className="text-xs">
              {v.desc}
              </p>

              <p className="text-xs my-4">
              {new Date(v.createdAt).toDateString()}
              </p>

              <div className="flex justify-end">
                <i title="Edit" onClick={()=>setDataInForm(v)}  className="bx bx-edit text-blue-600 text-xl p-1 cursor-pointer"></i>
                <i title="Delete" onClick={()=>window.confirm("Are you sure to delete this Note") && deleteNotes(v._id)} className="bx bx-trash text-red-700 text-xl p-1 cursor-pointer"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;