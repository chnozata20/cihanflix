import { createContext, useState, useEffect } from "react";
import {
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchPopularTVShows,
    fetchTopRatedTVShows,
    fetchSearchResults,
    fetchMovieDetails,
    fetchTVShowDetails,
    fetchMovieCredits,
    fetchTVCredits
} from "../services/movieService";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTVShow, setSelectedTVShow] = useState(null);
    const [favourites, setFavourites] = useState(() => {
        // Local storage'dan favorileri yükle
        const storedFavourites = localStorage.getItem('favourites');
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    });
    const [movies, setMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("popular");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [cast, setCast] = useState([]);

    // Yerel depolamaya favorileri kaydet
    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const loadMovies = async () => {
        try {
            const popularMovies = await fetchPopularMovies();
            setMovies(popularMovies);
        } catch (error) {
            console.error("Failed to fetch popular movies:", error);
        }
    };

    const loadTopRatedMovies = async () => {
        try {
            const topRated = await fetchTopRatedMovies();
            setTopRatedMovies(topRated);
        } catch (error) {
            console.error("Failed to fetch top-rated movies:", error);
        }
    };

    const loadTVShows = async () => {
        try {
            const popularTVShows = await fetchPopularTVShows();
            setTVShows(popularTVShows);
        } catch (error) {
            console.error("Failed to fetch popular TV shows:", error);
        }
    };

    const loadTopRatedTVShows = async () => {
        try {
            const topRated = await fetchTopRatedTVShows();
            setTopRatedTVShows(topRated);
        } catch (error) {
            console.error("Failed to fetch top-rated TV shows:", error);
        }
    };

    const loadMovieDetails = async (movieId) => {
        try {
            const movie = await fetchMovieDetails(movieId);
            const credits = await fetchMovieCredits(movieId);
            setCast(credits.cast);
            setSelectedMovie(movie);
            
            return movie;
        } catch (error) {
            console.error("Failed to load movie details:", error);
        }
    };

    const loadTVShowDetails = async (tvShowId) => {
        try {
            const tvShow = await fetchTVShowDetails(tvShowId);
            const credits = await fetchTVCredits(tvShowId);
            setCast(credits.cast);
            setSelectedTVShow(tvShow);

            return tvShow;
        } catch (error) {
            console.error("Failed to load TV show details:", error);
        }
    };

    const toggleFavourite = (movieOrShow) => {
        setFavourites((prev) =>
            prev.some((fav) => fav.id === movieOrShow.id)
                ? prev.filter((fav) => fav.id !== movieOrShow.id)
                : [...prev, movieOrShow]
        );
    };

    const handleSearch = async (query) => {
        if (query.length >= 3) {
            try {
                const results = await fetchSearchResults(query);
                setSearchResults(results);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const fetchBackgroundImage = async () => {
        const popularMovies = await fetchPopularMovies();
        const randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
        setBackgroundImage(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
    };

    useEffect(() => {
        loadMovies();
        loadTopRatedMovies();
        loadTVShows();
        loadTopRatedTVShows();
    }, []);

    const displayedMovies = searchResults.length > 0 
        ? searchResults 
        : selectedCategory === "popular" 
            ? movies 
            : topRatedMovies;

    const displayedTVShows = searchResults.length > 0 
        ? searchResults 
        : selectedCategory === "popular" 
            ? tvShows 
            : topRatedTVShows;

    return (
        <MovieContext.Provider
            value={{
                loadMovieDetails,
                loadTVShowDetails,
                selectedMovie,
                selectedTVShow,
                favourites,
                toggleFavourite,
                displayedMovies,
                displayedTVShows,
                handleSearch,
                handleCategoryChange,
                selectedCategory,
                backgroundImage,
                fetchBackgroundImage,
                cast
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContextProvider;
