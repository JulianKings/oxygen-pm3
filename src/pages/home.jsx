/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef } from 'react';
import '../style/home.css';
import Masonry from 'masonry-layout';
import Photo from '../components/photo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, forceUpdateSearchItems, selectSearchItems, selectSearchQuery, selectSearchResult, selectSearchSettings, selectSearchStatus, selectSearchType } from '../redux/slices/searchSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { sortArray } from '../util/sorting';

function Home()
{
    const homeContainer = useRef(null);
    let masonry = useRef(null);

    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const searchStatus = useSelector(selectSearchStatus);
    const searchResult = useSelector(selectSearchResult);
    const searchItems = useSelector(selectSearchItems);
    const searchSettings = useSelector(selectSearchSettings);
    const searchType = useSelector(selectSearchType);

    useEffect(() => {
        dispatch(fetchImages(searchQuery));
    }, [searchQuery])

    useEffect(() => {
        if(searchStatus === 'fulfilled')
        {
            dispatch(forceUpdateSearchItems(searchResult));
        }
    }, [searchStatus]);

    useEffect(() => {
        if(searchItems && searchItems.length > 0)
        {
            const sorted = sortArray(searchItems, searchSettings, searchType);
            dispatch(forceUpdateSearchItems(sorted));
        }
    }, [searchSettings, searchType])

    useEffect(() => {
        masonry.current = new Masonry('.home', {
            itemSelector: '.home__item',
            columnWidth: '.home__length',
            gutter: 10,
            percentPosition: true,
        })

        console.log(searchItems);

    }, [searchItems]);

    const photoContent = (searchItems && searchStatus !== 'pending') ?
        ((searchStatus !== 'rejected' && searchItems.length > 0) ? 
            <Fragment>
                {searchItems.map((photo) => {
                    return <div key={photo.id} className='home__item'>
                            <Photo key={photo.id} photo={photo} />
                    </div>;
                })}
            </Fragment> :
            <Fragment>
                <div className='home__caption'>
                    There are no photos for that query
                </div>
            </Fragment>) :
        <Fragment>
            <div className='home__caption'>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        </Fragment>

    return <>
        <section ref={homeContainer} className='home'>
            <div className='home__length'></div>
            {photoContent}            
        </section>
    </>;
}

export default Home;