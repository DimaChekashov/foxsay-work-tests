import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import './SmallLoader.css';

function SmallLoader() {
    return (
        <div className="small-loader">
            <CircularProgress size={60}/>
        </div>
    )
}

export default SmallLoader;