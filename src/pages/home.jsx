/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef, useState } from 'react';
import '../style/home.css';
import Masonry from 'masonry-layout';
import Photo from '../components/photo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, forceUpdateSearchItems, selectSearchItems, selectSearchMaxPages, selectSearchQuery, selectSearchResult, selectSearchSettings, selectSearchStatus, selectSearchType, updateSearchItems } from '../redux/slices/searchSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { sortArray } from '../util/sorting';
import { useLocation } from 'react-router-dom';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [increasePage, setIncreasePage] = useState(false);
    const location = useLocation();
    const searchMaxPage = useSelector(selectSearchMaxPages);
    const [searchChanged, setSearchChanged] = useState(false);

    useEffect(() => {
        dispatch(fetchImages({searchQuery: searchQuery, page: currentPage}));
        setSearchChanged(true);
    }, [searchQuery])

    useEffect(() => {
        if(searchMaxPages > 1 && increasePage)
        {
            const nextPage = currentPage + 1;
            dispatch(fetchImages({searchQuery: searchQuery, page: nextPage}));
            setCurrentPage(nextPage);
            setIncreasePage(false);
        }
    }, [increasePage])

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

    useEffect(() => {
        const onScroll = () => 
        {
            const percentage = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
            const roundedPercentage = Math.round(percentage);

            if(roundedPercentage > 90 && location.pathname === '/')
            {
                if(currentPage < searchMaxPage)
                {                
                    if(!increasePage)
                    {
                        setIncreasePage(true)
                    }
                }

            }
        }
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [currentPage, searchMaxPage]);

    const photoContent = (searchItems && searchStatus !== 'pending') ?
        ((searchStatus !== 'rejected' && searchItems.length > 0) ? 
            <Fragment>
                {searchItems.map((photo) => {
                    return <div key={photo.id} className='home__item'>
                            <Photo key={photo.id} photo={photo} searchQuery={searchQuery} />
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
        <section key={searchQuery} ref={homeContainer} className='home'>
            <div className='home__length'></div>
            {photoContent}            
        </section>
        <section className='home__more'>
            {(searchItems && searchItems.length > 0) ? (searchQuery === '' || searchQuery === null) ? <Fragment>
                <button type='button' className='home__more__button' onClick={() => {
                    dispatch(fetchImages({searchQuery: '', page: 1}));    
                }}>Load more</button>
            </Fragment> : '' : ''}
        </section>
    </>;
}

export default Home;