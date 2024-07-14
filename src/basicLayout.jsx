import './style/content.css';
import searchSettingsImage from './assets/search-settings.png';
import homeImage from './assets/home.png';
import myPhotosImage from './assets/photos.png';
import cameraImage from './assets/camera-icon.png';
import linkedInImage from './assets/linkedin.png';
import { getNextQuote } from './util/quoteManager';
import { Outlet } from 'react-router-dom';

function BasicLayout()
{
    const quote = getNextQuote();

    return <>
        <header className='header'>
            <nav className='header__menu'>
                <div className='header__menu__item header__menu__item--title'><img src={cameraImage} alt='Camera Icon' /><span>Oxygen</span>pics</div>
                <nav className='header__menu__item'><img src={homeImage} alt='Home' /> Home</nav>
                <nav className='header__menu__item'><img src={searchSettingsImage} alt='Search settings' /> Search Settings</nav>
                <nav className='header__menu__item'><img src={myPhotosImage} alt='My photos' />My Photos</nav>
            </nav>

            <div className='header__quote'>
                {quote}
            </div>

            <div className='header__search_bar'>
                <input type='text' id='search-bar' className='header__search_bar__input' placeholder='Search images...' />
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
    </>;
}

export default BasicLayout;