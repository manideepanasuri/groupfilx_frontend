import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Result } from '@/app_types/recommendationsjson'
import { userAuthStore } from '@/store/userAuthStore'
import { Star } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MovieDetails: React.FC = () => {
    const { movieId } = useParams()
    const { tokens } = userAuthStore()
    const [movie, setMovie] = useState<Result | null>(null)
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [submittingRating, setSubmittingRating] = useState(false)
    console.log(movie);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const url = import.meta.env.VITE_BACKEND_HOST + 'movies/getmovie/';
                const config = {
                    url: url,
                    method: 'post',
                    data: {
                        movie_id: Number(movieId),
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokens.access}`,
                    },
                }

                const res = await axios(config);
                setMovie(res.data);
                setRating(res.data.rating);
                // toast.success(`Loaded "${res.data.title}" successfully!`)
            } catch (err) {
                console.error('Error fetching movie:', err)
                // toast.error('Failed to load movie details. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [movieId, tokens.access])

    const handleRatingChange = async (newRating: number) => {
        setRating(newRating)
        setSubmittingRating(true)

        try {
            const url = import.meta.env.VITE_BACKEND_HOST + 'movies/rating/'
            const config = {
                url: url,
                method: 'post',
                data: {
                    movie_id: Number(movieId),
                    rating: newRating,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokens.access}`,
                },
            }

            await axios(config)
            toast.success(`You rated this movie ${newRating}/5`)
        } catch (err) {
            console.error('Error submitting rating:', err)
            setRating(0)
            toast.error('Failed to submit rating. Please try again.')
        } finally {
            setSubmittingRating(false)
        }
    }

    if (loading || !movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
                <p className="text-foreground text-lg">Loading movie details...</p>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-300 overflow-hidden pb-32">
            {/* Fullscreen Blurred Backdrop */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    filter: 'blur(10px) brightness(0.4)',
                    transform: 'scale(1.1)',
                    zIndex: 0,
                }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80 dark:from-slate-950/70 dark:via-slate-950/60 dark:to-slate-950/80 transition-colors duration-300 z-0" />

            <div className="relative max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-8 z-10">
                {/* Left: Poster */}
                <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-xl shadow-2xl transition-transform duration-300 hover:shadow-xl"
                    />
                </div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-5xl font-bold text-foreground transition-colors duration-300">
                        {movie.title}
                    </h1>
                    <p className="text-base text-muted-foreground transition-colors duration-300">
                        {movie.release_date} • {movie.runtime} mins •{' '}
                        <span className="text-primary transition-colors duration-300">
                            {movie.genres.map((g) => g.name).join(', ')}
                        </span>
                    </p>
                    <p className="mt-4 text-foreground leading-relaxed transition-colors duration-300 opacity-90">
                        {movie.overview}
                    </p>

                    {/* Ratings */}
                    <div className="mt-6 flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={28}
                                className={`cursor-pointer transition-all duration-200 ${(hoverRating || rating) >= i
                                        ? 'fill-yellow-400 text-yellow-400 scale-110'
                                        : 'text-muted-foreground hover:text-foreground'
                                    } ${submittingRating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onMouseEnter={() => !submittingRating && setHoverRating(i)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => !submittingRating && handleRatingChange(i)}
                            />
                        ))}
                        <span className="ml-4 text-lg font-semibold text-foreground transition-colors duration-300">
                            {rating > 0 ? `${rating}/5` : 'Rate'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MovieDetails