import { NoteProps, Priority } from "../../models/Notes";
import "./note.css";
import { FaTrash, FaEdit } from "react-icons/fa";

function Note({id, text, priority, deleteNote, editNote}: NoteProps) {
    const handleDelete = (id: string) => {
        deleteNote(id);
    }
    const handleEdit = (id: string, text: string, priority: Priority) => {
        editNote(id, text, priority);
    }
    return <div className={`note ${priority}`}>
        <p>{text}</p>
        <div className="icons-wrapper">
            <FaTrash onClick={() => handleDelete(id)} />
            <FaEdit onClick={() => handleEdit(id, text, priority)} />
        </div>
    </div>
}

export default Note;