import {useState} from "react";
import {notesList} from "./NotesData";
import Note from "./Note";
import { NoteType, Priority } from "../../models/Notes";
import AddNote from "./AddNote";
function NoteList() {
    const [notes, setNotes] = useState<NoteType[]>(notesList);
    const [editMode, setEditMode] = useState(false);
    const [editedNote, setEditedNote] = useState<NoteType | null>(null);
    const addNote = (note: NoteType) => {
        setNotes([note, ...notes])
    }
    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    }
    const editNote = (id: string, text: string, priority: Priority) => {
        setEditMode(true);
        setEditedNote({id, text, priority});
    }
    const updateNote = (updatedNote: NoteType) => {
        setNotes(notes.map(note => {
            if(note.id === updatedNote.id) {
                return updatedNote;
            }else{
                return note;
            }
        }))
        setEditMode(false);
    }
    return <div>
        <h2>Notes App ({notes.length})</h2>
        <AddNote addNote={addNote} editMode={editMode} editedNote={editedNote} updateNote={updateNote} />
        {notes.map(note => <Note key={note.id} id={note.id} text={note.text} priority={note.priority} deleteNote={deleteNote} editNote={editNote} />)}
    </div>
}

export default NoteList;