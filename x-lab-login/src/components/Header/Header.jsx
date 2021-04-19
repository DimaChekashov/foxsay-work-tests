import React from 'react';
import './Header.css';
import { logout } from '../../api/openApi';

function Header({username, onLogoutSuccess}) {
    const doLogout = () => {
        logout()
            .then(onLogoutSuccess)
            .catch(console.error);
    }

    return (
        <div className="header">
            {username}
            <button className="logout-btn" onClick={doLogout}>Выйти</button>
        </div>
    );
}

export default Header;