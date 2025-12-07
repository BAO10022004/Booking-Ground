import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/PromotionSlider.css';
import i from '../assets/images/MOMO-Logo-App.png'
interface SlideImage {
  id: string;
  url: string;
  title: string;
}

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  images: SlideImage[];
  backgroundColor: string;
  ctaText: string;
  ctaLink: string;
}

const PromotionSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [waveOrigin, setWaveOrigin] = useState({ x: 50, y: 50 });
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides: SlideData[] = [
    {
      id: 1,
      title: 'ĐẶT 1 GIỜ TẶNG 1 GIỜ',
      subtitle: 'Pickleball Bounce - Khuyến mãi đặc biệt',
      backgroundColor: '#2563eb',
      ctaText: 'ĐẶT LỊCH NGAY',
      ctaLink: '/booking',
      images: [
        { id: '1', url: i, title: 'Sân Pickleball 1' },
        { id: '2', url: i, title: 'Sân Pickleball 2' },
        { id: '3', url: i, title: 'Sân Pickleball 3' },
        { id: '4', url: i, title: 'Khu vực tập luyện' },
        { id: '5', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Phòng chờ VIP' },
        { id: '6', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Không gian thư giãn' },
      ]
    },
    {
      id: 2,
      title: 'ALOBO APP',
      subtitle: 'Đặt sân thông minh - Quản lý dễ dàng',
      backgroundColor: '#00A550',
      ctaText: 'TẢI APP NGAY',
      ctaLink: '/download',
      images: [
        { id: '1', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Giao diện app' },
        { id: '2', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Đặt lịch nhanh' },
        { id: '3', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Thanh toán online' },
        { id: '4', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Quản lý sân' },
        { id: '5', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Thống kê' },
        { id: '6', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Hỗ trợ 24/7' },
      ]
    },
    {
      id: 3,
      title: 'GIẢM NGAY 10%',
      subtitle: 'Ưu đãi tháng 12 - Đặt sân trước',
      backgroundColor: '#dc2626',
      ctaText: 'ĐẶT NGAY',
      ctaLink: '/promotion',
      images: [
        { id: '1', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Sân cầu lông' },
        { id: '2', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Sân tennis' },
        { id: '3', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Sân bóng đá' },
        { id: '4', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Phòng gym' },
        { id: '5', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Hồ bơi' },
        { id: '6', url: 'https://lumeninc.org/wp-content/uploads/2024/11/wedding-venue-near_me-2.jpg', title: 'Yoga studio' },
      ]
    }
  ];

  const nextSlide = (e?: React.MouseEvent) => {
    if (isTransitioning) return;
    
    if (e && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setWaveOrigin({ x, y });
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 1200);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (isTransitioning) return;
    
    if (e && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setWaveOrigin({ x, y });
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 1200);
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    if (isTransitioning || index === currentSlide) return;
    
    if (e && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setWaveOrigin({ x, y });
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 1200);
  };

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  return (
    <div className="promotion-slider" ref={sliderRef}>
      {/* Wave Transition Effect */}
      <div 
        className={`wave-transition ${isTransitioning ? 'active' : ''}`}
        style={{
          '--x': `${waveOrigin.x}%`,
          '--y': `${waveOrigin.y}%`,
          background: slides[(currentSlide + 1) % slides.length].backgroundColor
        } as React.CSSProperties}
      >
        <svg className="wave-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="waveGradient">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle 
            cx={waveOrigin.x} 
            cy={waveOrigin.y} 
            r="0" 
            fill="url(#waveGradient)"
            className={isTransitioning ? 'wave-circle' : ''}
          />
        </svg>
      </div>

      {/* Slides */}
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundColor: slide.backgroundColor }}
          >
            {/* Header */}
            <div className="slide-header">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>

            {/* Image Grid */}
            <div className="image-grid">
              {slide.images.map((image, imgIndex) => (
                <div
                  key={image.id}
                  className="grid-image"
                  style={{ '--item-index': imgIndex } as React.CSSProperties}
                >
                  {image.url ? (
                    <div 
                      className="image-content"
                      style={{
                        backgroundImage: `url(${image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="image-overlay">
                        <span>{image.title}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <span className="image-icon">🖼️</span>
                      <span className="image-title">{image.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="cta-container">
              <button 
                className="cta-button"
                onClick={() => console.log(`Navigate to: ${slide.ctaLink}`)}
              >
                {slide.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="nav-arrow nav-prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button className="nav-arrow nav-next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={(e) => goToSlide(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;