import React, {useState, useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import './Album.css';

import { chunks } from '../../utils/utils';
import { getAllPhotos } from '../../api/openApi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Album({open, handleClose, album}) {
    const [photosInChunks, setPhotosInChunks] = useState([]);
    const {id, title} = album;

    useEffect(() => {
        const chuksSize = Math.floor(window.innerWidth / 150);
        getAllPhotos()
            .then((photos) => photos.filter(({albumId}) => albumId === id))
            .then((photos) => setPhotosInChunks(chunks(photos, chuksSize)))
            .catch(console.error);
    }, [id]);

    const row = (photos, i) => {
        return (
            <div className="photo-row" key={`row-` + i} >
                {
                photos.map(({id, thumbnailUrl, title}) => {
                    return <img 
                        key={`photo-` + id} 
                        src={thumbnailUrl} 
                        alt={title}
                    />;
                })
                }
            </div>
        );
    }

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
                    {photosInChunks.map((photos, i) => {
                        return row(photos, i);
                    })}
                </div>
            </Dialog>
        </div>
    )
}

export default Album;