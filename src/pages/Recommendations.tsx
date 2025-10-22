import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { RecommendationsJSON, Result, Genre } from '@/app_types/recommendationsjson';
import { userAuthStore } from '@/store/userAuthStore';
import axios from 'axios';
import RecommendationCarousel from '@/components/RecommendationsCarousel';
import Loader from '@/components/Loader';

// ---------- Horizontal Section ----------
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
  console.log(title);
  console.log(movies);

  if (!movies.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/50 hover:bg-primary/75 text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/50 hover:bg-primary/75 text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationsJSON>([]);
  const [genreMovies, setGenreMovies] = useState<Record<string, Result[]>>({});
  const [loading, setLoading] = useState(true);
  const { tokens } = userAuthStore();

  // Predefined genres (you already have these)
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
        }
        const responser = await axios(configr);
        console.log(responser.data);
        const recData: RecommendationsJSON = responser.data;
        setRecommendations(recData);
        // console.log(recommendations);

        // 2️⃣ Fetch movies by genre (parallel)
        const genrePromises = genres.map(async (g) => {
          const urlg = import.meta.env.VITE_BACKEND_HOST + `movies/query/?genres=${g.id}&ordering=-popularity`;
          const configg = {
            url: urlg,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens.access}`,
            },
          }
          const responseg = await axios(configg);
          // console.log(responseg)
          const data: Result[] = responseg.data.results;
          console.log(data);

          return [g.name, data] as [string, Result[]];
        });

        const results = await Promise.all(genrePromises);
        console.log("results");
        console.log(results);
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">

        {/* ✅ Recommendations Row */}
        <RecommendationCarousel movies={recommendations} />

        {/* 🎬 Rows for Each Genre */}
        {Object.entries(genreMovies).map(([genre, movies]) => (
          <ScrollRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
