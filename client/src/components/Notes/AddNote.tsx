import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AddNoteProps, Priority } from "../../models/Notes";

function AddNote({addNote, editMode, editedNote, updateNote}: AddNoteProps) {
    const [note, setNote] = useState("");
    const [priority, setPriority] = useState<Priority>("low");
    const handleNoteChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    }
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as Priority);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!editMode) {
            addNote({id: uuidv4(), text: note, priority});
        }else{
            editedNote ? updateNote({id: editedNote.id, text: note, priority}) : null;
        }
        setNote("");
        setPriority("low");
    }
    useEffect(() => {
        if(editedNote) {
            setNote(editedNote.text);
            setPriority(editedNote?.priority);
        }
    }, [editedNote])
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="newNote" value={note} onChange={handleNoteChange} />
            <select name="priority" onChange={handlePriorityChange} value={priority}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">{editMode ? 'Edit': 'Add'}</button>
        </form>
    )
}

export default AddNote;