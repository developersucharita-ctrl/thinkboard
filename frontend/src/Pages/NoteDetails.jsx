import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"
import api from "../lib/axios.js"
import toast, { LoaderIcon } from "react-hot-toast"
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const NoteDetails = () => {
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)


    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        const getNoteDetails = async () => {
            try {
                // const noteDetails = await api.get('/notes', { id })
                const noteDetails = await api.get(`/notes/${id}`,)
                console.log(noteDetails.data.data)
                console.log(noteDetails.data.data)
                setNote(noteDetails.data.data)
            } catch (err) {
                console.log("Error in fetching note", err)
                toast.error("Failed to fetch data")
            } finally {
                setLoading(false)
            }
        }
        getNoteDetails()
    }, [id])

    const handleSave = async (e) => {
        e.preventDefault()
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please enter all fields")
            return
        }
        setSaving(true)
        try {
            await api.put(`/notes/${id}`, note)
            toast.success("Note updated")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Error on saving")
        } finally {
            setSaving(false);
        }
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure want to delete?")) return
        setLoading(true)
        try {
            await api.delete(`/notes/${id}`)
            toast.success("note deleted successfully")
            navigate("/")
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    if (loading || !note) {
        return (<div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
        </div>)
    }
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="block mb-1 font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note?.title || ""}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="block mb-1 font-medium">
                                    Content
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32"
                                    value={note?.content || ''}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetails