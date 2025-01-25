import React from 'react';
import { Note } from '../../types/types';
import { getDate } from '../../utils/helpers';
import "./ListItem.css";

interface Props {
  active?: boolean;
  onClick(): void;
  note: Note;
}

const ListItem: React.FC<Props> = ({
  active = false, 
  onClick, 
  note: {
    title,
    date,
    additionalText
  }
}) => {
  return (
    <div 
      className={`list-item${active ? " active" : ""}`}
      onClick={onClick}
    >
      <div className="list-item__heading">{title}</div>
      <div className="list-item__text">
        <span>{getDate(date)}</span> {additionalText}
      </div>
    </div>
  )
}

export default ListItem;
