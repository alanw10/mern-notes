import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router'
import api from '../lib/axios'
const CreatePage = () => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [loading,setLoading] = useState(false)

  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!title.trim() || !content.trim()) {
    //   toast.error("missing required fields")
    //   return
    // }
    setLoading(true)
    try {
      await api.post("/notes", {
        title, content
      })
      toast.success('note created successfully')
      Navigate("/")
    } catch (error) {
      
      console.log("error creating note",error)
      if (error.response.status === 429){
         toast.error("please slow down" , {
          duration: 4000,
          icon: "☠️",
        })
      } else {
        toast.error("failed to create note")      
      }
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
    <div className="container mx-auto px-4 py-8">
      <div className = "max-w-2xl mx-auto">
        <Link to={"/"}className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5'/>
          Back to Notes
        </Link>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type = "text" placeholder='note name'
                className='input input-bordered' value = {title} onChange = {(e) =>setTitle(e.target.value)}></input>

              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='write your note...' 
                className='textarea textarea-bordered h-32' 
                value={content} onChange= {(e) => setContent(e.target.value)}/>
                 

              </div>
              <div className="card-actions justify-end">
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? "creating.. " : "create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreatePage
