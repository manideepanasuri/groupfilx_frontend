import { Result } from "@/app_types/recommendationsjson";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Result;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const navigate = useNavigate();
  const imgSrc = movie.poster_path?.startsWith("http")
    ? movie.poster_path
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate(`/movies/${movie.id}`);
  };
  
  return (
    <motion.div
      onClick={handleCardClick}
      key={movie.id}
      className="w-[180px] flex-shrink-0 text-center cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.img
        src={imgSrc}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover rounded-xl shadow-md"
        loading="lazy"
        whileHover={{
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
        }}
      />
      <motion.p 
        className="mt-2 text-foreground text-sm font-medium truncate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {movie.title}
      </motion.p>
    </motion.div>
  );
};

export default MovieCard;