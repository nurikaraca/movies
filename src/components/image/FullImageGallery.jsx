import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

const FullImageGallery = ({ images, startIndex = 0, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <button
        onClick={onClose}
        className="text-foreground text-xl absolute top-4 left-4 z-50"
      >
        ✖
      </button>

      <Swiper
        navigation={true} modules={[Navigation]} className="w-screen h-auto max-h-[calc(100vh-140px)] xl:my-[70px] my-10"
        
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="text-center text-[18px] bg-[#444] flex justify-center items-center ">
            <img
              src={`https://image.tmdb.org/t/p/original${img.file_path}`}
              alt={`Full view ${index}`}
              
              className='block w-full h-full object-cover '
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullImageGallery;
