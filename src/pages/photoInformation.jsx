import '../style/information.css';
import widthImage from '../assets/width.png';
import heightImage from '../assets/height.png';
import calendarImage from '../assets/calendar.png';
import editImage from '../assets/edit.png';
import downloadImage from '../assets/download_white.png';

function PhotoInformation()
{
    const mockPhoto = {
        "id": "Dwu85P9SOIk",
        "created_at": "2016-05-03T11:00:28-04:00",
        "updated_at": "2016-07-10T11:00:01-05:00",
        "width": 244,
        "height": 356,
        "color": "#6E633A",
        "blur_hash": "LFC$yHwc8^$yIAS$%M%00KxukYIp",
        "downloads": 1345,
        "likes": 24,
        "description": "A man drinking a coffee.",
        "urls": {
            "raw": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
            "full": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg",
            "regular": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max",
            "small": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max",
            "thumb": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max"
        },
    }

    const photoDate = (new Date(mockPhoto.created_at));
    
    return <>
        <div className="information">
            <div className='information__carousel' >
                <div className='information__carousel__main'>
                    <img src={mockPhoto.urls.regular} alt='Image' />
                </div>
            </div>

            <div className='information__description'>
                {mockPhoto.description}
            </div>

            <div className='information__details'>
                <div className='information__details__width'>
                    <img src={widthImage} alt='Width' />
                    <span>{mockPhoto.width}px</span>
                </div>

                <div className='information__details__width'>
                    <img src={heightImage} alt='Width' />
                    <span>{mockPhoto.height}px</span>
                </div>

                <div className='information__details__calendar'>
                    <img src={calendarImage} alt='Created at' />
                    <span>{photoDate.toDateString()}</span>
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
        </div></>;
}

export default PhotoInformation;