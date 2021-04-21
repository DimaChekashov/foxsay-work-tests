import React, { useState, useEffect } from 'react';

import Loader from '../Loaders/Loader/Loader';

import { chunks } from '../../utils/utils';
import { getAllPhotos } from '../../api/openApi';

import './MainGallery.css';

function MainGallery({isOpenedProfile, setIsOpenedProfile, setCurrentUserId}) {
    const [photosInChunks, setPhotosInChunks] = useState([]);
    
    useEffect(() => {
        const chuksSize = Math.floor(window.innerWidth / 150);
        getAllPhotos()
            .then((photos) => setPhotosInChunks(chunks(photos, chuksSize)))
            .catch(console.error);
    }, []);

    const row = (photos, i) => {
        return (
            <div className="photo-row" key={`row-` + i} >
                {
                photos.map(({id, albumId, thumbnailUrl, title}) => {
                    return <img 
                        key={`photo-` + id} 
                        src={thumbnailUrl} 
                        alt={title} 
                        onClick={() => {
                            setIsOpenedProfile(!isOpenedProfile)
                            setCurrentUserId(albumId);
                        }}
                    />;
                })
                }
            </div>
        );
    }

    if (photosInChunks.length === 0) return (<div className="gallery"><Loader/></div>);

    return (
        <div className="gallery">
            {photosInChunks.map((photos, i) => {
                return row(photos, i);
            })}
        </div>
    )
}

export default MainGallery;