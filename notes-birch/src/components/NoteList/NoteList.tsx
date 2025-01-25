import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../context';
import { Note } from '../../types/types';
import ListItem from '../ListItem/ListItem';
import "./NoteList.css";

const NoteList: React.FC = () => {
  const {
    notes,
    currentNote,
    setCurrentNote,
    searchQuery,
    setEditMode
  } = useContext(Context);

  const [noteList, setNoteList] = useState<Note[]>(notes);

  useEffect(() => {
    setNoteList(notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, notes]);

  return (
    <div className="note-list">
      {noteList.length !== 0 ? (
        noteList.map((note: Note) => <ListItem 
          active={currentNote?.id === note.id}
          key={note.id}
          note={note}
          onClick={() => {
            setEditMode(false);
            setCurrentNote(note);
          }}
        />)
      ) : (
        <div className="empty-list-title">Empty Note list</div>
      )}
    </div>
  )
}

export default NoteList;
