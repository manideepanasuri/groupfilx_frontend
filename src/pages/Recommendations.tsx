import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { RecommendationsJSON, Result, Genre } from '@/app_types/recommendationsjson';
import { userAuthStore } from '@/store/userAuthStore';
import axios from 'axios';
import RecommendationCarousel from '@/components/RecommendationsCarousel';
import Loader from '@/components/Loader';

// ---------- Motion Variants ----------
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

// ---------- Horizontal Scroll Section ----------
const ScrollRow: React.FC<{ title: string; movies: Result[] }> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amt = 300;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -amt : amt,
        behavior: 'smooth',
      });
    }
  };

  if (!movies.length) return null;

  return (
    <motion.section
      className="relative z-0 mb-12 overflow-visible"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-primary/50 hover:bg-primary/75 text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        {/* ✅ overflow fixed here */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-visible overflow-y-visible scroll-smooth pb-2"
        >
          {movies.map((movie, idx) => (
            <motion.div
              key={movie.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={idx}
              viewport={{ once: true }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-primary/50 hover:bg-primary/75 text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.section>
  );
};

// ---------- Main Recommendations Component ----------
const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationsJSON>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Result[]>>({});
  const [loading, setLoading] = useState(true);
  const { tokens } = userAuthStore();

  const genres: Genre[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Adventure' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Crime' },
    { id: 6, name: 'Thriller' },
    { id: 7, name: 'Fantasy' },
    { id: 8, name: 'Comedy' },
    { id: 9, name: 'Romance' },
    { id: 10, name: 'Western' },
    { id: 11, name: 'Mystery' },
    { id: 12, name: 'War' },
    { id: 13, name: 'Animation' },
    { id: 14, name: 'Family' },
    { id: 15, name: 'Horror' },
    { id: 16, name: 'Music' },
    { id: 17, name: 'History' },
    { id: 18, name: 'TV Movie' },
    { id: 19, name: 'Documentary' },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urlr = import.meta.env.VITE_BACKEND_HOST + `movies/recomendations/`;
        const configr = {
          url: urlr,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`,
          },
        };
        const responser = await axios(configr);
        const recData: RecommendationsJSON = responser.data;
        setRecommendations(recData);

        const genrePromises = genres.map(async (g) => {
          const urlg =
            import.meta.env.VITE_BACKEND_HOST + `movies/query/?genres=${g.id}&ordering=-popularity`;
          const configg = {
            url: urlg,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens.access}`,
            },
          };
          const responseg = await axios(configg);
          const data: Result[] = responseg.data.results;
          return [g.name, data] as [string, Result[]];
        });

        const results = await Promise.all(genrePromises);
        const genreMap = Object.fromEntries(results);
        setGenreMovies(genreMap);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RecommendationCarousel movies={recommendations} />
        </motion.div>

        {Object.entries(genreMovies).map(([genre, movies]) => (
          <ScrollRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;
