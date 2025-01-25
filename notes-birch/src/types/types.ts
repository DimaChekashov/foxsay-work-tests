export interface Note {
    id?: number;
    title: string;
    date: number;
    additionalText: string;
    mdText: string;
}

export interface AppContext {
    notes: Note[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    editMode: boolean;
    setEditMode(e: boolean): void;
    currentNote?: Note;
    setCurrentNote(e: Note): void;
}