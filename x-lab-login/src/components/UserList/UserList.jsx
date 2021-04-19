import React, { useEffect, useState } from 'react';

import { getUsers } from '../../api/openApi';

import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        getUsers()
            .then(setUsers)
            .catch(console.error);
    }, []);

    return(
        <div className="list-block">
            <ul className="list">
                <h3>Список пользователей</h3>
                {users.map(({id, username, first_name, last_name, email}) => {
                    return (
                    <li key={id} className="list-item">
                        <p>Id пользователя: <b>{id}</b></p>
                        <p>username пользователя: <b>{username}</b></p>
                        <p>first_name пользователя: <b>{first_name}</b></p>
                        <p>last_name пользователя: <b>{last_name}</b></p>
                        <p>email пользователя: <b>{email}</b></p>
                    </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default UserList;