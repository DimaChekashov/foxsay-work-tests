import React, { useState, useEffect } from 'react';

import Loader from '../Loaders/Loader/Loader';

import { getAllPhotos } from '../../api/openApi';

import './MainGallery.css';

function MainGallery({isOpenedProfile, setIsOpenedProfile, setCurrentUserId}) {
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        getAllPhotos()
            .then(setPhotos)
            .catch(console.error);
    }, []);

    if (photos.length === 0) return (<div className="gallery"><Loader/></div>);

    return (
        <div className="gallery">
            {photos.map(({id, albumId, thumbnailUrl, title}) => {
                return <img 
                    key={`photo-` + id} 
                    src={thumbnailUrl} 
                    alt={title} 
                    onClick={() => {
                        setIsOpenedProfile(!isOpenedProfile)
                        setCurrentUserId(albumId);
                    }}
                />;
            })}
        </div>
    )
}

export default MainGallery;