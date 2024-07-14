import PropTypes from 'prop-types';
import '../style/photo.css';
import bookmarkImage from '../assets/bookmark_filled.png';
import bookmarkImageSaved from '../assets/bookmark_filled_saved.png';
import downloadImage from '../assets/download.png';
import informationImage from '../assets/information.png';
import { Fragment } from 'react';

function Photo({ photo, myPhotos = false })
{
    console.log(photo);

    const myPhotosContent = (!myPhotos) ?
        <Fragment></Fragment> :
        <Fragment>
            <div className='photo__information'>
                <img src={informationImage} alt='Get more information' />
            </div>
        </Fragment>;

    return <>
        <div className='photo' >
            <div className='photo__bookmark'>
                <img src={bookmarkImage} alt='Save as favorite' onMouseOver={(event) => {
                    event.target.src = bookmarkImageSaved;
                }} onMouseOut={(event) => {
                    event.target.src = bookmarkImage;
                }} />
            </div>

            <div className='photo__download'>
                <img src={downloadImage} alt='Download image' />
            </div>

            {myPhotosContent}
            <img style={{ height: photo.height + 'px' }} src={photo.urls.regular} alt={photo.description} />
        </div>
    </>;
}

Photo.propTypes = {
    photo: PropTypes.object,
    myPhotos: PropTypes.bool
}

export default Photo;