export type Priority = 'low' | 'medium' | 'high';

export type NoteType = {
    id: string,
    text: string,
    priority: Priority
}

export type AddNoteProps = {
    addNote: (note: NoteType) => void,
    editedNote: NoteType | null,
    editMode: boolean,
    updateNote: (note: NoteType) => void
}

export interface NoteProps extends NoteType {
    deleteNote: (id: string) => void,
    editNote: (id: string, text: string, priority: Priority) => void
}