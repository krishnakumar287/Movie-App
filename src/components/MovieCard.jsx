import { motion } from 'framer-motion';

export function MovieCard({ movie, index }) {
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-t from-yellow-600 via-amber-600 to-neutral-600 opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-300"></div>
      <div className="relative overflow-hidden rounded-lg bg-zinc-900">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={`${IMG_PATH}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />
        
        {/* Description Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center p-6">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <h3 className="text-white font-bold text-xl mb-3">{movie.title}</h3>
            <p className="text-gray-200 text-sm mb-2 line-clamp-4">{movie.overview}</p>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${
                movie.vote_average >= 7 ? 'text-green-400' : 
                movie.vote_average >= 5 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300 text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}