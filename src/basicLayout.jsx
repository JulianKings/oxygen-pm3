/* eslint-disable react-hooks/exhaustive-deps */
import './style/content.css';
import searchSettingsImage from './assets/search-settings.png';
import homeImage from './assets/home.png';
import myPhotosImage from './assets/photos.png';
import cameraImage from './assets/camera-icon.png';
import linkedInImage from './assets/linkedin.png';
import { getNextQuote } from './util/quoteManager';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSearchQuery } from './redux/slices/searchSlice';
import { useState } from 'react';
import BasicModal from './components/modal';

function BasicLayout()
{
    const quote = getNextQuote();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [settingsModal, updateSettingsModal] = useState(false);

    return <>
        <header className='header'>
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
            </nav>

            <div className='header__quote'>
                {quote}
            </div>

            <div className='header__search_bar'>
                <input type='text' id='search-bar' className='header__search_bar__input' placeholder='Search images...'
                    onChange={(event) => {
                        const vSearchQuery = event.target.value;
                        dispatch(updateSearchQuery(vSearchQuery));
                    }} />
                <span></span>
            </div>
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