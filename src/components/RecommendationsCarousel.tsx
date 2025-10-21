import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Result } from '@/app_types/recommendationsjson'

interface RecommendationCarouselProps {
  movies: Result[]
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ movies }) => {
  const navigate = useNavigate()

  if (!movies || movies.length === 0) return null

  const handleMovieClick = (movieId: number) => {
    window.scrollTo(0, 0)
    navigate(`/movies/${movieId}`)
  }

  return (
    <section className="mb-12">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="w-full">
              <motion.div
                onClick={() => handleMovieClick(movie.id)}
                className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {movie.title}
                  </h3>
                  <p className="mt-2 md:mr-100 text-white text-sm md:text-base line-clamp-2">
                    {movie.overview}
                  </p>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full">
          ‹
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full">
          ›
        </CarouselNext>
      </Carousel>
    </section>
  )
}

export default RecommendationCarousel
