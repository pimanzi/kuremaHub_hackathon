import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const slides = [
    {
      title: 'Discover Painting Masterpieces',
      description:
        'Explore vibrant palettes and creative expressions through our collection of paintings.',
      image: '/images/paint.png',
      category: 'Painting',
      accent: 'bg-primary',
    },
    {
      title: 'Sculptural Excellence',
      description:
        'Discover the mastery of form and dimension through our curated collection of contemporary and classical sculptures.',
      image: '/images/sculpture.jpg',
      category: 'Sculpture',
      accent: 'bg-accent',
      additionalImages: [
        'https://images.unsplash.com/photo-1558697698-9300a84a6a99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
    },
    {
      title: 'Fabric Art & Textiles',
      description:
        'Immerse yourself in the world of textile art and fabric craftsmanship.',
      image:
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Fabrics',
      accent: 'bg-primary',
    },
    {
      title: 'Photography Gallery',
      description:
        'Capture moments frozen in time through our photography collection.',
      image:
        'https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Photography',
      accent: 'bg-accent',
    },
  ];

  return (
    <section
      id="home"
      className="relative h-[90vh] bg-secondary overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          // Responsive navigation visibility
          enabled: true,
          hideOnClick: true,
        }}
        loop={true}
        speed={800}
        className="w-full h-full mySwiper"
        breakpoints={{
          // When window width is >= 320px
          320: {
            navigation: {
              enabled: false,
            },
          },
          // When window width is >= 768px
          768: {
            navigation: {
              enabled: true,
            },
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: 'blur(8px)',
                  transform: 'scale(1.1)',
                  opacity: '0.3',
                }}
              />

              {/* Content Container */}
              <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
                  {/* Text Content */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 z-10">
                    <span className="text-accent font-semibold block">
                      {slide.category}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Baskerville'] text-primary leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                      <button
                        onClick={() => {
                          navigate('/catalogue');
                        }}
                        className="bg-primary text-neutral-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-accent transition-colors w-full sm:w-auto text-center"
                      >
                        Explore Gallery
                      </button>
                    </div>
                  </div>

                  {/* Image - Hidden on mobile, visible from sm breakpoint up */}
                  <div className="hidden sm:block">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Only visible on larger screens */}
      <div className="hidden md:block">
        <div className="swiper-button-prev !text-primary !opacity-70 hover:!opacity-100 transition-opacity"></div>
        <div className="swiper-button-next !text-primary !opacity-70 hover:!opacity-100 transition-opacity"></div>
      </div>
    </section>
  );
};

export default Hero;
