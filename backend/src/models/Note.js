import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Note = mongoose.model('notes', noteSchema)
export default Note