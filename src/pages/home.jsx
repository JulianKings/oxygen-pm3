import { useEffect, useRef } from 'react';
import '../style/home.css';
import Masonry from 'masonry-layout';
import Photo from '../components/photo';

function Home()
{
    const homeContainer = useRef(null);
    let masonry = useRef(null);

    const mockPhoto = {
        "id": "Dwu85P9SOIk",
        "created_at": "2016-05-03T11:00:28-04:00",
        "updated_at": "2016-07-10T11:00:01-05:00",
        "width": 244,
        "height": 326,
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
        "height": 126,
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
        "height": 526,
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
        masonry.current = new Masonry('.home', {
            itemSelector: '.home__item',
            columnWidth: '.home__length',
            gutter: 10,
            percentPosition: true,
        })

    }, []);

    return <>
        <section ref={homeContainer} className='home'>
            <div className='home__length'></div>
            <div className='home__item'>
                <Photo key={mockPhoto.id} photo={mockPhoto} />
            </div>

            <div className='home__item'>
                <Photo key={mockPhoto2.id} photo={mockPhoto2} />
            </div>

            <div className='home__item'>
                <Photo key={mockPhoto3.id} photo={mockPhoto3} />
            </div>

            <div className='home__item'>
                <Photo key={mockPhoto2.id} photo={mockPhoto3} />
            </div>

            <div className='home__item'>
                <Photo key={mockPhoto3.id} photo={mockPhoto3} />
            </div>

            <div className='home__item'>
                <Photo key={mockPhoto.id} photo={mockPhoto2} />
            </div>
            
        </section>
    </>;
}

export default Home;