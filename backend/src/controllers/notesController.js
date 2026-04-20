import Note from "../models/Note.js"
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: 1 }) //newest first
        res.status(200).json({
            success: true,
            message: "Notes fetched successfully...",
            data: notes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: []
        })
    }

}

export const getNoteById = async (req, res) => {
    try {
        const id = req.params.id
        const noteDetails = await Note.findById(id)
        if (!noteDetails) {
            return res.status(404).json({
                success: false,
                message: `not found`
            })
        }
        res.json({
            success: true,
            message: `Note found`,
            data: noteDetails
        })
    } catch (error) {
        res.json({
            success: false,
            message: `error on fetch data ${error}`
        })
    }
}
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })
        await note.save()
        res.status(200).json({
            sucess: true,
            message: "Note created",
            data: note
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `Error on creation ${error}`
        })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const id = req.params.id
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true })
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Note updated...",
            data: updatedNote
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error on update :" + error
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id
        const deletedNote = await Note.findByIdAndDelete(id)
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Data deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

