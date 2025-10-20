import { Result } from "@/app_types/recommendationsjson";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Result;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const imgSrc = movie.poster_path?.startsWith("http")
    ? movie.poster_path
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      key={movie.id}
      className="w-[180px] flex-shrink-0 text-center cursor-pointer transition-transform hover:scale-105"
    >
      <img
        src={imgSrc}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover rounded-xl shadow-md"
      />
      <p className="mt-2 text-foreground text-sm font-medium truncate">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;