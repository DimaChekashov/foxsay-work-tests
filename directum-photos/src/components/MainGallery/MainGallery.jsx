import React, { useState, useEffect } from 'react';
import { chunks } from '../../utils/utils';

import { getAllPhotos } from '../../api/openApi';

import './MainGallery.css';

function MainGallery() {
    const [photosInChunks, setPhotosInChunks] = useState([]);
    
    useEffect(() => {
        const chuksSize = Math.floor(window.innerWidth / 150);
        getAllPhotos()
            .then((photos) => setPhotosInChunks(chunks(photos, chuksSize)))
            .catch(console.error);
    }, []);

    const row = (photos) => {
        return (
            <div className="photo-row">
                {
                photos.map(({id, thumbnailUrl, title}) => {
                    return <img key={id} src={thumbnailUrl} alt={title} />;
                })
                }
            </div>
        );
    }

    if (photosInChunks.length === 0) return (<div className="gallery">Loading</div>);

    return (
        <div className="gallery">
            {photosInChunks.map(row)}
        </div>
    )
}

export default MainGallery;