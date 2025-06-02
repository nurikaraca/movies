




import React, { useEffect, useState } from "react";
import { getGenres } from "../../api/movieService";
import GenreMovies from "./GenreMovies";

const GenreSection  = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const result = await getGenres();
        setGenres(result);
   
      } catch (error) {
        console.error("Error loading genres", error);
      }
    };

    fetchGenres();
  }, []);


  return (
    <section id="genre">
    <div className=" space-y-12 px-4 py-6">
      
      {genres.map((genre) => (
        <div key={genre.id}>
           <div className="flex justify-start">
        <div className="bg-yellow-400 w-1 h-7"></div>
        <h2 className="ml-4 mb-4">{genre.name}</h2>
        </div>
          
           <GenreMovies genreId={genre.id} /> 
        </div>
      ))}
    </div>
    </section>
  );
};

export default GenreSection ;
