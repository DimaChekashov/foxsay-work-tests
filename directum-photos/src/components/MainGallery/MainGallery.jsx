import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhotos } from '../../api/openApi';
import { fetchPhotos, LoadingState, selectPhotos } from '../../redux/photosSlice';
import Loader from '../Loaders/Loader/Loader';
import './MainGallery.css';

function MainGallery({isOpenedProfile, setIsOpenedProfile, setCurrentUserId}) {
    const { photos, loading, error } = useSelector(selectPhotos);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllPhotos().then(console.log);
        dispatch(fetchPhotos());
    }, [dispatch]);

    if (loading === LoadingState.loading || loading === LoadingState.idle) return (<div className="gallery"><Loader/></div>);

    if (loading === LoadingState.failed) return (<h3>{error}</h3>);

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