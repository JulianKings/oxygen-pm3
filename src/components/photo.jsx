import PropTypes from 'prop-types';
import '../style/photo.css';
import bookmarkImage from '../assets/bookmark_filled.png';
import bookmarkImageSaved from '../assets/bookmark_filled_saved.png';
import downloadImage from '../assets/download.png';
import informationImage from '../assets/information.png';
import { Fragment, useState } from 'react';
import { appendPhoto, photoExist, removePhoto } from '../util/dataManager';
import { useDispatch } from 'react-redux';
import { appendPhotoToList, removePhotoFromList } from '../redux/slices/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';

function Photo({ photo, myPhotos = false, searchQuery = 'untagged' })
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [lastUpdate, setLastUpdate] = useState(null);
    const myPhotosContent = (!myPhotos) ?
        <Fragment></Fragment> :
        <Fragment>
            <div className='photo__information' onClick={() => {
                navigate('../photo/' + photo.id);
            }}>
                <img src={informationImage} alt='Get more information' />
            </div>
        </Fragment>;

    let imageSrc = bookmarkImage;
    if(photoExist(photo.id))
    {
        imageSrc = bookmarkImageSaved;
    }

    return <>
        <div key={lastUpdate} className='photo' >
            <div className='photo__bookmark'>
                <img src={imageSrc} alt='Save as favorite' 

                onMouseOver={(event) => {
                    event.target.src = (imageSrc === bookmarkImage) ? bookmarkImageSaved : bookmarkImage;
                }} 

                onMouseOut={(event) => {
                    event.target.src = (imageSrc === bookmarkImage) ? bookmarkImage : bookmarkImageSaved;
                }} 

                onClick={(event) => {
                    if(photoExist(photo.id))
                    {
                        removePhoto(photo.id);
                        event.target.src = bookmarkImage;
                        dispatch(removePhotoFromList(photo.id));
                        setLastUpdate((new Date));
                    } else {
                        const result = appendPhoto(photo, searchQuery);
                        dispatch(appendPhotoToList(result));
                        event.target.src = bookmarkImageSaved;
                        setLastUpdate((new Date));
                    }
                }} />
            </div>

            <div className='photo__download' onClick={() => {
                FileSaver.saveAs(photo.urls.full, photo.id + '.jpg');
            }}>
                <img src={downloadImage} alt='Download image' />
            </div>

            {myPhotosContent}
            <img style={{ height: (photo.height / 10) + 'px' }} src={photo.urls.regular} alt={photo.description} />
        </div>
    </>;
}

Photo.propTypes = {
    photo: PropTypes.object,
    myPhotos: PropTypes.bool,
    searchQuery: PropTypes.string
}

export default Photo;