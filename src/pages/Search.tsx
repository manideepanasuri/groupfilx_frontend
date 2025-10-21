import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { userAuthStore } from '@/store/userAuthStore';
import axios from 'axios';
import { SearchJSON, Result, Genre } from '@/app_types/searchquery';
import MovieCard from '@/components/MovieCard';
import Loader from '@/components/Loader';


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [orderBy, setOrderBy] = useState('Popularity');
  const [ascending, setAscending] = useState(false);
  const [movies, setMovies] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { tokens } = userAuthStore();


  const genreMap: Genre[] = [
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


  const genres = ['All', ...genreMap.map((g) => g.name)];
  const orderOptions = ['Release Date', 'Popularity', 'Vote Count', 'Vote Average'];


  const orderMap: Record<string, string> = {
    'Release Date': 'release_date',
    Popularity: 'popularity',
    'Vote Count': 'vote_count',
    'Vote Average': 'vote_average',
  };


  const fetchMovies = async (url?: string) => {
    try {
      setLoading(true);
      let finalUrl = url;

      if (!url) {
        const genreObj = genreMap.find((g) => g.name === selectedGenre);
        const genreParam = genreObj ? `&genres=${genreObj.id}` : '';

        const orderingField = orderMap[orderBy];
        const ordering = ascending ? orderingField : `-${orderingField}`;
        const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';

        finalUrl = import.meta.env.VITE_BACKEND_HOST + `movies/query/?ordering=${ordering}${genreParam}${searchParam}`;
      }

      const config = {
        url: finalUrl,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access}`,
        },
      };

      const response = await axios(config);
      console.log(response);

      const data: SearchJSON = response.data;

      setMovies(data.results || []);
      setNextPageUrl(data.next || null);
      setPreviousPageUrl(data.previous || null);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setCurrentPage(1);
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedGenre, orderBy, ascending]);


  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
      fetchMovies(nextPageUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage((prev) => prev - 1);
      fetchMovies(previousPageUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setOrderBy('Popularity');
    setAscending(false);
    setCurrentPage(1);
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const filterBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={filterBarVariants}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          {/* 🔍 Search Bar */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-muted border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
            />
          </div>


          {/* 🎭 Genre Filter */}
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[140px]">
              <SelectValue>{selectedGenre}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


          {/*  Ordering with arrow */}
          <div className="flex items-center gap-2">
            <Select value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue>{orderBy}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {orderOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setAscending(!ascending)}>
              {ascending ? '↑' : '↓'}
            </Button>
          </div>


          {/*  Reset */}
          <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Reset
          </Button>
        </motion.div>


        {/*  Movie Grid */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <Loader />
          </div>
        ) : movies.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
            >
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mt-8"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      disabled={!previousPageUrl}
                      className={!previousPageUrl ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <span className="px-4 py-2 text-muted-foreground">
                      Page {currentPage}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      disabled={!nextPageUrl}
                      className={!nextPageUrl ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 text-muted-foreground text-lg"
          >
            {searchTerm || selectedGenre !== 'All'
              ? 'No movies found matching your filters.'
              : 'Start typing or choose filters to search for movies.'}
          </motion.div>
        )}
      </div>
    </div>
  );
}