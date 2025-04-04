import { useState } from 'react';

export default function Slideshow() {
    const Slide_Banner = [
        { Image: 'http://localhost:8000/img/Banner 12.png' },
        { Image: 'http://localhost:8000/img/Banner 21.png' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Slide_Banner.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Slide_Banner.length) % Slide_Banner.length);
    };

    return (
        <main>
            <div className="slideshow-container" style={{ position: 'relative', overflow: 'hidden' }}>
                {Slide_Banner.map((Banner, index) => (
                    <div
                        key={index}
                        className="mySlides fade"
                        style={{
                            display: index === currentSlide ? 'block' : 'none',
                        }}
                    >
                        <img src={Banner.Image} style={{ width: '100%' }} alt={`Banner ${index}`} />
                    </div>
                ))}
                <a className="prev" onClick={prevSlide} style={{ cursor: 'pointer' }}>&#10094;</a>
                <a className="next" onClick={nextSlide} style={{ cursor: 'pointer' }}>&#10095;</a>
            </div>
        </main>
    );
}
