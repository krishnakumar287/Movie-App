import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';
import { RollingGallery } from './gallery/RollingGallery';
import { SearchBar } from './SearchBar';
import '../styles/gallery.css';

export function MovieGallery() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
  const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const fetchMovies = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setFilteredMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      fetchMovies(SEARCH_API + query);
    } else {
      fetchMovies(API_URL);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  const movieImages = movies.map(
    movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  );

  return (
    <div className="space-y-12">
      <RollingGallery 
        images={movieImages} 
        autoplay={true} 
        pauseOnHover={true} 
      />
      <div className="px-6">
        <SearchBar onSearch={handleSearch} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}