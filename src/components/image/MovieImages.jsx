import React, { useEffect, useState } from 'react';
import { getMovieImages } from '../../api/movieService';
import FullImageGallery from './FullImageGallery'; // birazdan oluşturacağız

const getRandomImages = (images, count) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MovieImages = ({ movieId }) => {
  const [allImages, setAllImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getMovieImages(movieId);
        setAllImages(data.backdrops);
        const selected = getRandomImages(data.backdrops, 8);
        setRandomImages(selected);
      } catch (error) {
        console.error('Error fetching movie images:', error);
      }
    };
    fetchImages();
  }, [movieId]);

  const handleImageClick = (img) => {
    const index = allImages.findIndex(i => i.file_path === img.file_path);
    setSelectedIndex(index);
    setShowGallery(true);
  };

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {randomImages.map((img, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(img)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
              alt={`Movie still ${index}`}
              className="w-full rounded-lg hover:scale-105 transition-transform duration-300"
            />
            {index === 7 && allImages.length > 8 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xl font-bold rounded-lg">
                +{allImages.length - 8}
              </div>
            )}
          </div>
        ))}
      </div>

      {showGallery && (
        <FullImageGallery
          images={allImages}
          startIndex={selectedIndex}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
};

export default MovieImages;
