import React, { useContext, useRef, useState } from 'react';
import { Context } from '../..';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import './AddTodo.less';

const AddTodo: React.FC = () => {
    const { firestore } = useContext(Context);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [file, setFile] = useState<File>();

    const fileRef = useRef<HTMLInputElement>(null);

    const { storageRef } = useContext(Context);

    const fileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        if (!file) return;

        setFile(file[0]);
    }

    /** Create a new todo and save it in firestore database */
    const createTodo = () => {
        const id: string = uuid();
        
        if(file) {
            storageRef.child(`files/${file?.name}`).put(file);
        }

        firestore.collection("todos").doc(id).set({
            id,
            title,
            description,
            fileUrl: file ? `files/${file?.name}` : "",
            success: false,
            endDate,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        clearFields();
    }

    /** Clear all fields on the inputs and textarea */
    const clearFields = () => {
        setTitle("");
        setDescription("");
        setEndDate(dayjs().format('YYYY-MM-DD'));
        
        if(fileRef.current) {
            fileRef.current.value = "";
        }
    }

    return (
        <div className="add-todo">
            <input 
                type="text" 
                placeholder="Todo name" 
                className="add-todo__input" 
                value={title}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
            />
            <textarea 
                name="describe" 
                placeholder="Todo description" 
                className="add-todo__textarea" 
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            <input 
                ref={fileRef}
                type="file" 
                className="add-todo__file" 
                onChange={fileOnChange} 
            />
            <div>
                <label htmlFor="date">Date to end:</label>
                <input 
                    id="date"
                    type="date" 
                    placeholder="Todo name" 
                    className="add-todo__date"
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(dayjs(new Date(e.target.value)).format('YYYY-MM-DD'))}
                />
            </div>
            <button className="add-todo__btn" onClick={createTodo}>Create Todo</button>
        </div>
    )
}

export default AddTodo;