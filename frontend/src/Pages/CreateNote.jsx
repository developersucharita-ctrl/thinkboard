import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from "../lib/axios.js"
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const CreateNote = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.")
      return
    }
    setLoading(true)
    try {
      const response = await api.post("/notes", { title, content }, {
        headers: { "Content-Type": "application/json", }
      })
      console.log(response)
      if (response.data) {
        toast.success("Note created successfully");

        // reset form
        setTitle("");
        setContent("");

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error(error + "Something went wrong");
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to="/" className='btn btn-ghost mb-6'> <ArrowLeftIcon className='size-5' />Back to notes</Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="block mb-1 font-medium">
                    Title
                  </label>
                  <input type="text" placeholder='Note title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='form-control mb-4'>
                  <label className="block mb-1 font-medium">
                    Content
                  </label>
                  <textarea name="" placeholder='Write your note here' className='textarea textarea-bordered h-32' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
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

export default CreateNote