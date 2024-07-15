import { Fragment, useEffect, useRef } from 'react';
import Photo from '../components/photo';
import '../style/my_photos.css';
import Masonry from 'masonry-layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhotoList, updatePhotoList } from '../redux/slices/favoriteSlice';
import { loadFromLocalStorage } from '../util/dataManager';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MyPhotos()
{
    const myPhotosContainer = useRef(null);
    let masonry = useRef(null);

    const photoList = useSelector(selectPhotoList);
    const dispatch = useDispatch();

    if(!photoList || (photoList && !photoList.length))
    {
        dispatch(updatePhotoList(loadFromLocalStorage()));
    }

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
                    You haven&apos;t saved any photos yet
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