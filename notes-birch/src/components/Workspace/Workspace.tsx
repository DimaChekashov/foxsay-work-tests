import React, { useCallback, useEffect, useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import Markdown from 'marked-react';
import "easymde/dist/easymde.min.css";
import "./Workspace.css";
import { Note } from '../../types/types';

interface Props {
  currentNote?: Note;
  updateNote(value: string): void;
  editMode: boolean;
}

const Workspace: React.FC<Props> = ({ 
  currentNote = {
    mdText: ""
  },
  updateNote,
  editMode
}) => {
  const [value, setValue] = useState<string>(currentNote.mdText);

  useEffect(() => {
    setValue(currentNote.mdText);
  }, [currentNote]);

  const onChange = useCallback((value: string) => {
    setValue(value);
    updateNote(value);
  }, [updateNote]);
  
  return (
    <div className="workspace">
      {editMode ? (
        <SimpleMDE className="editor" value={value} onChange={onChange} />
      ) : (
        <div className="markdown">
          <Markdown value={value} />
        </div>
      )}
    </div>
  )
}

export default Workspace;
