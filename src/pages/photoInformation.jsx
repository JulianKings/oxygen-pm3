/* eslint-disable react-hooks/exhaustive-deps */
import '../style/information.css';
import widthImage from '../assets/width.png';
import heightImage from '../assets/height.png';
import calendarImage from '../assets/calendar.png';
import editImage from '../assets/edit.png';
import downloadImage from '../assets/download_white.png';
import likesImage from '../assets/love.png';
import blackWidthImage from '../assets/width_black.png';
import blackHeightImage from '../assets/height_black.png';
import blackCalendarImage from '../assets/calendar_black.png';
import blackEditImage from '../assets/edit_black.png';
import blackDownloadImage from '../assets/download_black.png';
import blackLikesImage from '../assets/love_black.png';
import arrowLeftImage from '../assets/arrow-left.png';
import arrowRightImage from '../assets/arrow-right.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { loadNextPhoto, loadPhoto, loadPrevPhoto } from '../util/dataManager';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FileSaver from 'file-saver';
import BasicModal from '../components/modal';
import PropTypes from 'prop-types';
import { selectSearchSettings, selectSearchType } from '../redux/slices/searchSlice';
import { useSelector } from 'react-redux';

function PhotoInformation({slideProp = 'none'})
{
    const [loadingInformation, setLoadingInformation] = useState(true);
    const [photoInformation, setPhotoInformation] = useState(null);
    const [descriptionModal, setDescriptionModal] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const searchSettings = useSelector(selectSearchSettings);
    const searchType = useSelector(selectSearchType);

    useEffect(() => {
        if(loadingInformation)
        {
            setLoadingInformation(false);
            setPhotoInformation(loadPhoto(params['id']));
        }
    }, [params['id']]);

    useEffect(() => {
        //update on close to be sure everything is up to date
        if(!descriptionModal && photoInformation)
        {
            setPhotoInformation(loadPhoto(params['id']));
        }
    }, [descriptionModal, params['id']])

    const photoDate = (photoInformation) ? (new Date(photoInformation.created_at)) : '';

    let nextPhoto = null;
    let superNextPhoto = null;
    let prevPhoto = null;
    let superPrevPhoto = null;

    if(photoInformation) {
        nextPhoto = loadNextPhoto(photoInformation.id, searchSettings, searchType);
        superNextPhoto = loadNextPhoto(nextPhoto.id, searchSettings, searchType);
        prevPhoto = loadPrevPhoto(photoInformation.id, searchSettings, searchType);
        superPrevPhoto = loadPrevPhoto(prevPhoto.id, searchSettings, searchType);
    }
    
    return (loadingInformation) ?
        <Fragment>
            <div className='information'>
                <div className='information__caption'>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            </div>
        </Fragment> :
            (photoInformation) ? 
                <Fragment>
                    <BasicModal modalStatus={descriptionModal} updateModalStatus={setDescriptionModal} currentDescription={photoInformation.description} currentId={photoInformation.id} />
                    <div className="information">
                        <div key={photoInformation.id} className={(slideProp === 'left') ? 'information__carousel information__carousel--left' :
                            (slideProp === 'right') ? 'information__carousel information__carousel--right' : 'information__carousel'
                        } >
                            { (prevPhoto) ? 
                                <Fragment>
                                    <div className='information__carousel__prev information__carousel__prev--far'>
                                        <img src={superPrevPhoto.urls.regular} alt='Previous Image' />
                                    </div>

                                    <div className='information__carousel__prev'>
                                        <img src={prevPhoto.urls.regular} onClick={() => {
                                            navigate('../left_photo/' + prevPhoto.id);
                                        }} alt='Previous Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }

                            <div className={(slideProp === 'left') ? 'information__carousel__main information__carousel__main--grow' :
                            (slideProp === 'right') ? 'information__carousel__main information__carousel__main--grow' : 'information__carousel__main'
                        }>
                                <img src={photoInformation.urls.regular} alt='Image' />

                                <div className='information__arrow'>
                            { (prevPhoto) ? 
                                <Fragment>
                                    <div className='information__arrow__prev information__arrow--inside'>
                                        <img src={arrowLeftImage} onClick={() => {
                                            navigate('../left_photo/' + prevPhoto.id);
                                        }} alt='Previous Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }

                            { (nextPhoto) ? 
                                <Fragment>
                                    <div className='information__arrow__next information__arrow--inside'>
                                        <img src={arrowRightImage} onClick={() => {
                                            navigate('../right_photo/' + nextPhoto.id);
                                        }} alt='Next Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }
                        </div>
                            </div>

                            { (nextPhoto) ? 
                                <Fragment>
                                    <div className='information__carousel__next'>
                                        <img src={nextPhoto.urls.regular} onClick={() => {
                                            navigate('../right_photo/' + nextPhoto.id);
                                        }} alt='Next Image' />
                                    </div>

                                    <div className='information__carousel__next information__carousel__next--far'>
                                        <img src={superNextPhoto.urls.regular} alt='Next Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }
                        </div>

                        <div className='information__description'>
                            <span className='information__description__title'>Description</span>
                            
                            {photoInformation.description}
                        </div>

                        <div className='information__arrow'>
                            { (prevPhoto) ? 
                                <Fragment>
                                    <div className='information__arrow__prev'>
                                        <img src={arrowLeftImage} onClick={() => {
                                            navigate('../left_photo/' + prevPhoto.id);
                                        }} alt='Previous Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }

                            { (nextPhoto) ? 
                                <Fragment>
                                    <div className='information__arrow__next'>
                                        <img src={arrowRightImage} onClick={() => {
                                            navigate('../right_photo/' + nextPhoto.id);
                                        }} alt='Next Image' />
                                    </div>
                                </Fragment> :
                                <Fragment></Fragment>
                            }
                        </div>

                        <div className='information__details'>
                            <div className='information__details__width'>
                                <img src={widthImage} className='information__details__white' alt='Width' />
                                <img src={blackWidthImage} className='information__details__black' alt='Width' />
                                <span>{photoInformation.width}px</span>
                            </div>

                            <div className='information__details__height'>
                                <img src={heightImage} className='information__details__white' alt='Height' />
                                <img src={blackHeightImage} className='information__details__black' alt='Height' />
                                <span>{photoInformation.height}px</span>
                            </div>

                            <div className='information__details__calendar'>
                                <img src={calendarImage} className='information__details__white' alt='Created at' />
                                <img src={blackCalendarImage} className='information__details__black' alt='Created at' />
                                <span>{photoDate.toDateString()}</span>
                            </div>
                        </div>

                        <div className='information__details information__details__second'>
                            <div className='information__details__likes'>
                                <img src={likesImage} className='information__details__white' alt='Likes' />
                                <img src={blackLikesImage} className='information__details__black' alt='Likes' />
                                <span>{photoInformation.likes} likes</span>
                            </div>                            
                        </div>

                        <div className='information__actions'>
                            <div className='information__actions__item' onClick={() => {
                                FileSaver.saveAs(photoInformation.urls.full, photoInformation.id + ".jpg");
                            }}>
                                <img src={downloadImage} alt='Download image' className='information__details__white' />
                                <img src={blackDownloadImage} alt='Download image' className='information__details__black' />
                                Download
                            </div>

                            <div className='information__actions__item' onClick={() => {
                                setDescriptionModal(true);
                            }}>
                                <img src={editImage} alt='Edit image' className='information__details__white' />
                                <img src={blackEditImage} alt='Edit image' className='information__details__black' />
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

PhotoInformation.propTypes = {
    slideProp: PropTypes.string,
}

export default PhotoInformation;