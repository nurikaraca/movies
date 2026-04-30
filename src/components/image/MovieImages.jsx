import { useMemo, useState } from "react";
import { useMovieImages } from "../../hooks/useMovieImages";
import FullImageGallery from "./FullImageGallery";

const getRandomImages = (images, count) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MovieImages = ({ movieId }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const { data, isLoading, isError } = useMovieImages(movieId);

  const allImages = useMemo(() => data?.backdrops ?? [], [data]);
  const randomImages = useMemo(() => getRandomImages(allImages, 8), [allImages]);

  const handleImageClick = (img) => {
    const index = allImages.findIndex((image) => image.file_path === img.file_path);
    setSelectedIndex(index);
    setShowGallery(true);
  };

  if (isLoading) {
    return <p className="text-sm text-foreground/60">Loading photos...</p>;
  }

  if (isError || allImages.length === 0) {
    return <p className="text-sm text-foreground/60">No photos found.</p>;
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {randomImages.map((img, index) => (
          <div
            key={img.file_path}
            className="relative cursor-pointer"
            onClick={() => handleImageClick(img)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
              alt={`Movie still ${index + 1}`}
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
          startIndex={selectedIndex ?? 0}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
};

export default MovieImages;
