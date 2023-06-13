import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

export const Logros = () => {
  return (

    <>
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false
            }}
            loop={true}
        >

            <SwiperSlide>
                Slide 1
            </SwiperSlide>
            <SwiperSlide>
                Slide 2
            </SwiperSlide>
            
        </Swiper>    
    </>
  )
}
