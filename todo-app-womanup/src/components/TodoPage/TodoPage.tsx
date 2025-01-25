import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { Todo } from '../../types/types';
import './TodoPage.less';

interface Props {
    todo?: Todo;
    editMode: boolean;
    setCurrentTodo(todo: Todo | undefined): void;
    setEditMode(status: boolean): void;
}

const TodoPage: React.FC<Props> = ({todo, editMode, setEditMode, setCurrentTodo}) => {
    const { storageRef, firestore } = useContext(Context);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

    const isFailed: boolean = dayjs(todo?.endDate).format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD');

    useEffect(() => {
        setTitle(todo?.title as string);
        setDescription(todo?.description as string);
        setEndDate(dayjs(todo?.endDate).format('YYYY-MM-DD'));
    }, [todo]);

    /** Download file from firebase storage */
    const downloadFile = () => {
        storageRef.child(todo?.fileUrl).getDownloadURL()
            .then((url: string) => {
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.href = url;
                link.target = "_blank";
                link.download = "im dsdagete sdxt02.jpg";
                link.click();
                document.body.removeChild(link);
            });
    }

    /** Update todo success field */
    const updateSuccess = () => {
        if(todo) {
            firestore.collection('todos').doc(todo?.id).update({
                "success": !todo.success
            });
            
            setCurrentTodo({...todo, success: !todo.success});
        }
    }

    /** Update title, description, endDate fields of the todo */
    const updateFields = () => {
        if(todo) {
            firestore.collection('todos').doc(todo.id).update({
                "title": title,
                "description": description,
                "endDate": dayjs(endDate).valueOf()
            });
            
            setCurrentTodo({...todo, title, description, endDate: dayjs(endDate).valueOf()});
        }
        
        setEditMode(false);
    }

    /** Delete todo */
    const deleteTodo = (id: string) => {
        firestore.collection("todos").doc(id).delete();
        setCurrentTodo(undefined);
    }
    
    /** @returns {string} classes of todo__date */
    const getTodoDateClasses = (): string => {
        return [
            "todo__date",
            !isFailed ? " failed" : "",
            todo?.success ? " success" : ""
        ].join(" ")
    }

    if (!todo) {
        return (
            <div className="todo">
                <div className="todo__edit-title">Select Todo</div>
            </div>
        )
    }

    const editLayout = (
        <div className="todo">
            <div className="todo__header">
                <input 
                    type="text" 
                    placeholder="Todo name" 
                    className="todo__input"
                    value={title}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                />
            </div>
            <div className="todo__body">
                <textarea 
                    name="describe" 
                    placeholder="Todo description" 
                    className="todo__textarea"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                />
                <div className="todo__date">
                    End date: 
                    <input 
                        type="date" 
                        placeholder="Todo name" 
                        className="todo__dateinput"
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(dayjs(new Date(e.target.value)).format('YYYY-MM-DD'))}
                    />
                </div>
            </div>
            <div className="todo__footer">
                <div className="todo__controls">
                    <button type="button" className="todo__controls-btn todo__controls-btn_update" onClick={updateFields}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        !editMode ? (
            <div className="todo">
                <div className="todo__header">
                    <h2 className="todo__title">{todo?.title}</h2>
                </div>
                <div className="todo__body">
                    <p className="todo__description">{todo?.description}</p>
                    <div className={getTodoDateClasses()}>
                        End date: {dayjs(todo?.endDate).startOf('day').format('YYYY-MM-DD')}
                    </div>
                </div>
                <div className="todo__footer">
                    <div className="todo__controls">
                        <button 
                            type="button" 
                            className={`todo__controls-btn ${todo.success ? "danger" : "success"}`} 
                            onClick={updateSuccess}
                        >
                            {todo.success ? "Uncomplete" : "Complete"}
                        </button>
                        <button type="button" className="todo__controls-btn todo__controls-btn_update" onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                        <button type="button" className="todo__controls-btn todo__controls-btn_download" onClick={downloadFile}>
                            Download File
                        </button>
                        <button type="button" className="todo__controls-btn danger todo__controls-btn_delete" onClick={() => deleteTodo(todo?.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            editLayout
        )
    )
}

export default TodoPage;