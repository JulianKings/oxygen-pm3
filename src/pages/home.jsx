/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef } from 'react';
import '../style/home.css';
import Masonry from 'masonry-layout';
import Photo from '../components/photo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, selectSearchQuery, selectSearchResult, selectSearchStatus } from '../redux/slices/searchSlice';
import { updateSearchItems } from '../redux/slices/searchSlice';

function Home()
{
    const homeContainer = useRef(null);
    let masonry = useRef(null);

    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const searchStatus = useSelector(selectSearchStatus);
    const searchResult = useSelector(selectSearchResult);

    useEffect(() => {
        dispatch(fetchImages(searchQuery));
    }, [searchQuery])

    useEffect(() => {
        if(searchStatus === 'fulfilled')
        {
            dispatch(updateSearchItems(searchResult));
        }
    }, [searchStatus]);

    useEffect(() => {
        masonry.current = new Masonry('.home', {
            itemSelector: '.home__item',
            columnWidth: '.home__length',
            gutter: 10,
            percentPosition: true,
        })

    }, [searchResult]);

    const photoContent = (searchResult) ?
        ((searchResult.length > 0) ? 
            <Fragment>
                {searchResult.map((photo) => {
                    return <div key={photo.id} className='home__item'>
                            <Photo key={photo.id} photo={photo} />
                    </div>;
                })}
            </Fragment> :
            <Fragment>There are no photos for that query</Fragment>) :
        <Fragment>Loading...</Fragment>

    return <>
        <section ref={homeContainer} className='home'>
            <div className='home__length'></div>
            {photoContent}            
        </section>
    </>;
}

export default Home;