import React from 'react';
import { Button, Modal } from 'antd';
import { 
  DeleteOutlined, 
  EditOutlined, 
  FileAddOutlined, 
  ExclamationCircleOutlined,
  ArrowLeftOutlined 
} from "@ant-design/icons";
import SearchBox from '../SearchBox/SearchBox';
import { Note } from '../../types/types';
import { MOBILE_WIDTH } from '../../utils/consts';
import "./Header.css";

const { confirm } = Modal;

interface Props {
  editMode: boolean;
  setEditMode(e: boolean): void;
  currentNote?: Note;
  setCurrentNote(e?: Note): void;
  setCreateNoteModal(e: boolean): void;
  deleteNote(): void;
}

const Header: React.FC<Props> = ({
  setCreateNoteModal, 
  deleteNote, 
  setCurrentNote,
  currentNote,
  setEditMode,
  editMode
}) => {

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this note?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteNote();
      }
    });
  };

  return (
    <div className="header">
      {window.innerWidth >= MOBILE_WIDTH ? (
        <SearchBox />
      ) : undefined}
      <Button 
        className="header__btn"
        type="primary" 
        size="large" 
        icon={<FileAddOutlined />}
        onClick={() => setCreateNoteModal(true)}
      >Create a note</Button>
      {currentNote && (
        <>
          <Button 
            className="header__btn"
            type="primary" 
            size="large" 
            icon={<EditOutlined />} 
            onClick={() => setEditMode(!editMode)}
          >Edit</Button>
          <Button 
            className="header__btn"
            type="primary" 
            size="large" 
            danger 
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
          >Delete</Button>
        </>
      )}
      {window.innerWidth < MOBILE_WIDTH && currentNote ? (
        <>
          <Button 
            className="back-btn"
            shape="circle" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => {
              setCurrentNote(undefined);
              setEditMode(false);
            }}
          />
        </>
      ): undefined}
    </div>
  )
}

export default Header;
