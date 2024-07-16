/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef, useState } from 'react';
import '../style/home.css';
import Masonry from 'masonry-layout';
import Photo from '../components/photo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, forceUpdateSearchItems, increaseSearchCurrentPage, selectSearchCurrentPage, selectSearchIncreasePage, selectSearchItems, selectSearchMaxPages, selectSearchQuery, selectSearchResult, selectSearchSettings, selectSearchStatus, selectSearchType, updateSearchIncreasePage, updateSearchItems } from '../redux/slices/searchSlice';
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
    const searchMaxPages = useSelector(selectSearchMaxPages);
    const searchCurrentPage = useSelector(selectSearchCurrentPage);
    const searchIncreasePage = useSelector(selectSearchIncreasePage);
    const [searchChanged, setSearchChanged] = useState(false);

    useEffect(() => {
        dispatch(fetchImages({searchQuery: searchQuery, page: searchCurrentPage}));
        setSearchChanged(true);
    }, [searchQuery])

    useEffect(() => {
        console.log(searchIncreasePage);
        if(searchMaxPages > 1 && searchIncreasePage)
        {
            const nextPage = searchCurrentPage + 1;
            dispatch(fetchImages({searchQuery: searchQuery, page: nextPage}));
            dispatch(increaseSearchCurrentPage());
            dispatch(updateSearchIncreasePage(false));
        }
    }, [searchIncreasePage])

    useEffect(() => {
        if(searchStatus === 'fulfilled')
        {
            if(searchChanged)
            {
                dispatch(forceUpdateSearchItems(searchResult));
                setSearchChanged(false);
            } else {
                dispatch(updateSearchItems(searchResult));
            }
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