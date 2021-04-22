import React, {useState, useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import './Album.css';

import { getAllPhotos } from '../../api/openApi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Album({open, handleClose, album}) {
    const [photos, setPhotos] = useState([]);
    const {id, title} = album;

    useEffect(() => {
        getAllPhotos()
            .then((photos) => photos.filter(({albumId}) => albumId === id))
            .then(setPhotos)
            .catch(console.error);
    }, [id]);

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">
                        {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="album-content">
                    {photos.map(({id, thumbnailUrl, title}) => {
                        return <img 
                            key={`photo-` + id} 
                            src={thumbnailUrl} 
                            alt={title}
                        />;
                    })}
                </div>
            </Dialog>
        </div>
    )
}

export default Album;