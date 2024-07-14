import { useEffect, useRef } from 'react';
import Photo from '../components/photo';
import '../style/my_photos.css';
import Masonry from 'masonry-layout';

function MyPhotos()
{
    const myPhotosContainer = useRef(null);
    let masonry = useRef(null);

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

    const mockPhoto2 = {
        "id": "Dwu85P9SOIk",
        "created_at": "2016-05-03T11:00:28-04:00",
        "updated_at": "2016-07-10T11:00:01-05:00",
        "width": 244,
        "height": 196,
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

    const mockPhoto3 = {
        "id": "Dwu85P9SOIk",
        "created_at": "2016-05-03T11:00:28-04:00",
        "updated_at": "2016-07-10T11:00:01-05:00",
        "width": 244,
        "height": 626,
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

    useEffect(() => {
        masonry.current = new Masonry('.my_photos', {
            itemSelector: '.my_photos__item',
            columnWidth: '.my_photos__length',
            gutter: 10,
            percentPosition: true,
        })

    }, []);

    return <>
        <section ref={myPhotosContainer} className='my_photos'>
            <div className='my_photos__length'></div>
            <div className='my_photos__item'>
                <Photo key={mockPhoto.id} photo={mockPhoto} myPhotos={true} />
            </div>

            <div className='my_photos__item'>
                <Photo key={mockPhoto2.id} photo={mockPhoto2} myPhotos={true} />
            </div>

            <div className='my_photos__item'>
                <Photo key={mockPhoto3.id} photo={mockPhoto3} myPhotos={true} />
            </div>

            <div className='my_photos__item'>
                <Photo key={mockPhoto2.id} photo={mockPhoto3} myPhotos={true} />
            </div>

            <div className='my_photos__item'>
                <Photo key={mockPhoto3.id} photo={mockPhoto3} myPhotos={true} />
            </div>

            <div className='my_photos__item'>
                <Photo key={mockPhoto.id} photo={mockPhoto2} myPhotos={true} />
            </div>
            
        </section>
    </>;
}

export default MyPhotos;