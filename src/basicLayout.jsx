/* eslint-disable react-hooks/exhaustive-deps */
import './style/content.css';
import searchSettingsImage from './assets/search-settings.png';
import homeImage from './assets/home.png';
import myPhotosImage from './assets/photos.png';
import cameraImage from './assets/camera-icon.png';
import cameraWhiteImage from './assets/camera-icon-white.png';
import linkedInImage from './assets/linkedin.png';
import menuImage from './assets/menu_white.png';
import menuBlackImage from './assets/menu_black.png';
import crossImage from './assets/cross_icon.png';
import { getNextQuote } from './util/quoteManager';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchCurrentPage, selectSearchIncreasePage, selectSearchMaxPages, selectSearchQuery, updateSearchIncreasePage, updateSearchQuery } from './redux/slices/searchSlice';
import { useEffect, useRef, useState } from 'react';
import BasicModal from './components/modal';

function BasicLayout()
{
    const quote = getNextQuote();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [settingsModal, updateSettingsModal] = useState(false);
    const searchQuery = useSelector(selectSearchQuery);
    const headerContainer = useRef(null);
    const compressedHeaderContainer = useRef(null);
    const openableHeader = useRef(null);
    const location = useLocation();
    const searchCurrentPage = useSelector(selectSearchCurrentPage);
    const searchMaxPage = useSelector(selectSearchMaxPages);
    const searchIncreasePage = useSelector(selectSearchIncreasePage);

    useEffect(() => {
        const onScroll = () => 
        {
            const percentage = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
            const roundedPercentage = Math.round(percentage);

            if(roundedPercentage > 5)
            {
                if(headerContainer.current && compressedHeaderContainer.current)
                {
                    headerContainer.current.classList.toggle('header--hidden', true);
                    compressedHeaderContainer.current.classList.toggle('header__compressed--shown', true);
                }
            } else {
                if(headerContainer.current && compressedHeaderContainer.current)
                {
                    headerContainer.current.classList.toggle('header--hidden', false);
                    compressedHeaderContainer.current.classList.toggle('header__compressed--shown', false);
                }
            }

            if(roundedPercentage > 95 && location.pathname === '/')
            {
                if(searchCurrentPage < searchMaxPage)
                {
                    if(!searchIncreasePage)
                    {
                        dispatch(updateSearchIncreasePage(true));
                    }
                }

            }
        }
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return <>
        <header ref={openableHeader} className='openable_header'>
            <nav className='openable_header__menu'>
                <nav className='openable_header__cross'>
                    <img src={crossImage} alt='Menu' onClick={() => {
                        if(openableHeader.current)
                        {
                            openableHeader.current.classList.toggle('openable_header--open', false);
                        }
                    }} />
                </nav>

                <nav className='openable_header__menu__item' onClick={() => {
                    navigate('/');
                }}><img src={homeImage} alt='Home' /> Home</nav>
                <nav className='openable_header__menu__item' onClick={() => {
                    updateSettingsModal(true);
                }}><img src={searchSettingsImage} alt='Search settings' /> Search Settings</nav>
                <nav className='openable_header__menu__item' onClick={() => {
                    navigate('/my_photos');
                }}><img src={myPhotosImage} alt='My photos' />My Photos</nav>
            </nav>

        </header>

        <header ref={headerContainer} className='header'>
            <nav className='header__menu'>
                <div className='header__menu__item header__menu__item--title'><img src={cameraImage} alt='Camera Icon' /><span>Oxygen</span>pics</div>
                <nav className='header__menu__item' onClick={() => {
                    navigate('/');
                }}><img src={homeImage} alt='Home' /> Home</nav>
                <nav className='header__menu__item' onClick={() => {
                    updateSettingsModal(true);
                }}><img src={searchSettingsImage} alt='Search settings' /> Search Settings</nav>
                <nav className='header__menu__item' onClick={() => {
                    navigate('/my_photos');
                }}><img src={myPhotosImage} alt='My photos' />My Photos</nav>

                <nav className='header__menu__image'>
                    <img src={menuImage} alt='Menu' tabIndex={1} onClick={() => {
                        if(openableHeader.current)
                        {
                            openableHeader.current.classList.toggle('openable_header--open', true);
                        }
                    }} onBlur={() => {
                        if(openableHeader.current)
                        {
                            openableHeader.current.classList.toggle('openable_header--open', false);
                        }
                    }} />
                </nav>
            </nav>

            <div className='header__quote'>
                {quote}
            </div>

            <div className='header__search_bar'>
                <input type='text' id='search-bar' className='header__search_bar__input' placeholder='Search images...'
                    defaultValue={searchQuery}
                    onChange={(event) => {
                        const vSearchQuery = event.target.value;
                        dispatch(updateSearchQuery(vSearchQuery));
                    }} />
                <span></span>
            </div>
        </header>

        <header ref={compressedHeaderContainer} className='header header__compressed'>
            <div className='header__menu__item header__compressed__item header__menu__item--title'>
                <img src={cameraImage} className='header__menu__item--base' alt='Camera Icon' />
                <img src={cameraWhiteImage} className='header__menu__item--extra' alt='Camera Icon' />
            </div>
            
            <div className='header__search_bar header__compressed__search_bar'>
                <input type='text' id='search-bar-compressed' className='header__search_bar__input' placeholder='Search images...'
                    defaultValue={searchQuery}
                    onChange={(event) => {
                        const vSearchQuery = event.target.value;
                        dispatch(updateSearchQuery(vSearchQuery));
                    }} />
                <span></span>
            </div>

            <nav className='header__menu__item header__compressed__item' onClick={() => {
                navigate('/');
            }}><img src={homeImage} alt='Home' /></nav>
            <nav className='header__menu__item header__compressed__item' onClick={() => {
                updateSettingsModal(true);
            }}><img src={searchSettingsImage} alt='Search settings' /></nav>
            <nav className='header__menu__item header__compressed__item' onClick={() => {
                navigate('/my_photos');
            }}><img src={myPhotosImage} alt='My photos' /></nav>

            <nav className='header__menu__image'>
                <img src={menuBlackImage} alt='Menu' tabIndex={1}
                    onClick={() => {
                        if(openableHeader.current)
                        {
                            openableHeader.current.classList.toggle('openable_header--open', true);
                        }
                    }}

                    onBlur={() => {
                        if(openableHeader.current)
                        {
                            openableHeader.current.classList.toggle('openable_header--open', false);
                        }
                    }} />
            </nav>


            
        </header>

        <main className='content'>
            <Outlet />
        </main>

        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__text'>
                    <div className='footer__text__title'><span>Oxygen</span> Pics</div>
                    <div className='footer__text__subtitle'>© 2024 OXYGEN, All Rights Reserved</div>
                </div>

                <div className='footer__linkedin'>
                    <img src={linkedInImage} alt='LinkedIn' />
                </div>
            </div>
        </footer>



        <BasicModal modalStatus={settingsModal} updateModalStatus={updateSettingsModal} searchSettings={true} />
    </>;
}

export default BasicLayout;