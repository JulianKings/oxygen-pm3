/* eslint-disable react-hooks/exhaustive-deps */
import '../style/information.css';
import widthImage from '../assets/width.png';
import heightImage from '../assets/height.png';
import calendarImage from '../assets/calendar.png';
import editImage from '../assets/edit.png';
import downloadImage from '../assets/download_white.png';
import likesImage from '../assets/love.png';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { loadPhoto } from '../util/dataManager';

function PhotoInformation()
{
    const [loadingInformation, setLoadingInformation] = useState(true);
    const [photoInformation, setPhotoInformation] = useState(null);
    const params = useParams();


    useEffect(() => {
        if(loadingInformation)
        {
            setLoadingInformation(false);
            setPhotoInformation(loadPhoto(params['id']));
        }
    }, []);

    const photoDate = (photoInformation) ? (new Date(photoInformation.created_at)) : '';
    
    return (loadingInformation) ?
        <Fragment>
            <div className='information'>
                <div className='information__caption'>Loading...</div>
            </div>
        </Fragment> :
            (photoInformation) ? 
                <Fragment>
                    <div className="information">
                        <div className='information__carousel' >
                            <div className='information__carousel__main'>
                                <img src={photoInformation.urls.regular} alt='Image' />
                            </div>
                        </div>

                        <div className='information__description'>
                            {photoInformation.description}
                        </div>

                        <div className='information__details'>
                            <div className='information__details__width'>
                                <img src={widthImage} alt='Width' />
                                <span>{photoInformation.width}px</span>
                            </div>

                            <div className='information__details__width'>
                                <img src={heightImage} alt='Width' />
                                <span>{photoInformation.height}px</span>
                            </div>

                            <div className='information__details__calendar'>
                                <img src={calendarImage} alt='Created at' />
                                <span>{photoDate.toDateString()}</span>
                            </div>
                        </div>

                        <div className='information__details'>
                            <div className='information__details__likes'>
                                <img src={likesImage} alt='Likes' />
                                <span>{photoInformation.likes} likes</span>
                            </div>                            
                        </div>

                        <div className='information__actions'>
                            <div className='information__actions__item'>
                                <img src={downloadImage} alt='Download image' />
                                Download
                            </div>

                            <div className='information__actions__item'>
                            <img src={editImage} alt='Edit image' />
                                Edit description
                            </div>
                        </div>
                    </div>
                </Fragment> :
                <Fragment>
                    <div className='information'>
                        <div className='information__caption'>Couldn&apos;t find the following photo: {params['id']}</div>
                    </div>
                </Fragment>;
}

export default PhotoInformation;