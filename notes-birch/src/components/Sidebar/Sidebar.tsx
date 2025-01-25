import React from 'react';
import NoteList from '../NoteList/NoteList';
import { Note } from '../../types/types';
import SearchBox from '../SearchBox/SearchBox';
import { MOBILE_WIDTH } from '../../utils/consts';
import "./Sidebar.css";

interface Props {
  currentNote?: Note;
}

const Sidebar: React.FC<Props> = ({currentNote}) => {
  return (
    <div className={`sidebar${currentNote ? " show" : ""}`}>
      {window.innerWidth < MOBILE_WIDTH ? (
        <div className="sidebar__header">
          <SearchBox />
        </div>
      ) : undefined}
      <NoteList />
    </div>
  )
}

export default Sidebar;
