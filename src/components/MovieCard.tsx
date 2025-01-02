import { motion } from 'framer-motion';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export function MovieCard({ movie, index }: MovieCardProps) {
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg">
        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={`${IMG_PATH}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[400px] object-cover"
          />
          
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
            <div className="relative h-full p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-xl mb-2">{movie.title}</h3>
              <p className="text-gray-200 text-sm mb-3 line-clamp-3">{movie.overview}</p>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  movie.vote_average >= 7 ? 'bg-green-500/20 text-green-400' : 
                  movie.vote_average >= 5 ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300 text-sm bg-white/10 px-2 py-1 rounded-full">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}