/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef } from 'react';
import Photo from '../components/photo';
import '../style/my_photos.css';
import Masonry from 'masonry-layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhotoList, updatePhotoList } from '../redux/slices/favoriteSlice';
import { filterFromLocalStorage, loadFromLocalStorage } from '../util/dataManager';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { selectSearchQuery, selectSearchSettings, selectSearchType } from '../redux/slices/searchSlice';

function MyPhotos()
{
    const myPhotosContainer = useRef(null);
    let masonry = useRef(null);

    const photoList = useSelector(selectPhotoList);
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const searchSettings = useSelector(selectSearchSettings);
    const searchType = useSelector(selectSearchType);

    useEffect(() => {
        if(searchQuery && searchQuery !== '')
        {
            dispatch(updatePhotoList(filterFromLocalStorage('description', searchQuery, searchSettings, searchType)));
        } else {            
            dispatch(updatePhotoList(loadFromLocalStorage(searchSettings, searchType)));
        }
    }, [searchQuery, searchSettings, searchType]);

    useEffect(() => {
        masonry.current = new Masonry('.my_photos', {
            itemSelector: '.my_photos__item',
            columnWidth: '.my_photos__length',
            gutter: 10,
            percentPosition: true,
        })

    }, [photoList]);

    const photoContent = (photoList) ?
        ((photoList.length > 0) ? 
            <Fragment>
                {photoList.map((photo) => {
                    return <div key={photo.id} className='my_photos__item'>
                            <Photo key={photo.id} photo={photo} myPhotos={true} />
                    </div>;
                })}
            </Fragment> :
            <Fragment>
                <div className='my_photos__caption'>
                    {(searchQuery) ? ("Couldn't find any photo with the description: " + searchQuery) : "You haven't saved any photos yet"}
                </div>
            </Fragment>) :
        <Fragment>
            <div className='my_photos__caption'>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        </Fragment>

    return <>
        <section ref={myPhotosContainer} className='my_photos'>
            <div className='my_photos__length'></div>
            {photoContent}
            
        </section>
    </>;
}

export default MyPhotos;