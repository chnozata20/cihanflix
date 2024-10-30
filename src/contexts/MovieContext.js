import { createContext, useState, useEffect, useMemo } from "react";
import {
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchPopularTVShows,
    fetchTopRatedTVShows,
    fetchSearchResults,
    fetchMovieDetails,
    fetchTVShowDetails,
    fetchMovieCredits,
    fetchTVCredits,
    fetchGenres,
} from "../services/movieService";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTVShow, setSelectedTVShow] = useState(null);
    const [favourites, setFavourites] = useState(() => {
        const storedFavourites = localStorage.getItem("favourites");
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
    const [filter, setFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [genresMap, setGenresMap] = useState({});
    const [genres, setGenres] = useState([]);

    // Store favourites in local storage
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    // Load genres from the API
    const loadGenres = async () => {
        try {
            const fetchedGenres = await fetchGenres();
            const genreMap = Object.fromEntries(
                fetchedGenres.map((genre) => [genre.id, genre.name])
            );
            setGenresMap(genreMap);
            setGenres(fetchedGenres);
        } catch (error) {
            console.error("Failed to fetch genres:", error);
        }
    };

    // Load movies and TV shows
    const loadMoviesAndShows = async () => {
        try {
            const [popularMovies, topRated, popularTVShows, topRatedTV] =
                await Promise.all([
                    fetchPopularMovies(),
                    fetchTopRatedMovies(),
                    fetchPopularTVShows(),
                    fetchTopRatedTVShows(),
                ]);
            setMovies(popularMovies);
            setTopRatedMovies(topRated);
            setTVShows(popularTVShows);
            setTopRatedTVShows(topRatedTV);
        } catch (error) {
            console.error("Failed to load movies or TV shows:", error);
        }
    };

    // Load movie details
    const loadMovieDetails = async (movieId) => {
        try {
            const movie = await fetchMovieDetails(movieId);
            const credits = await fetchMovieCredits(movieId);
            setCast(credits.cast);
            setSelectedMovie(movie);
        } catch (error) {
            console.error("Failed to load movie details:", error);
        }
    };

    // Load TV show details
    const loadTVShowDetails = async (tvShowId) => {
        try {
            const tvShow = await fetchTVShowDetails(tvShowId);
            const credits = await fetchTVCredits(tvShowId);
            setCast(credits.cast);
            setSelectedTVShow(tvShow);
        } catch (error) {
            console.error("Failed to load TV show details:", error);
        }
    };

    // Toggle favourite
    const toggleFavourite = (item) => {
        setFavourites((prev) =>
            prev.some((fav) => fav.id === item.id)
                ? prev.filter((fav) => fav.id !== item.id)
                : [...prev, item]
        );
    };

    // Search for movies or TV shows
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

    // Change selected category
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Fetch background image
    const fetchBackgroundImage = async () => {
        try {
            const popularMovies = await fetchPopularMovies();
            const randomMovie =
                popularMovies[Math.floor(Math.random() * popularMovies.length)];
            setBackgroundImage(
                `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
            );
        } catch (error) {
            console.error("Failed to fetch background image:", error);
        }
    };

    // Load all data on mount
    useEffect(() => {
        loadGenres();
        loadMoviesAndShows();
    }, []);

    // Displayed movies and TV shows
    const displayedMovies =
        searchResults.length > 0
            ? searchResults
            : selectedCategory === "popular"
            ? movies
            : topRatedMovies;
    const displayedTVShows =
        searchResults.length > 0
            ? searchResults
            : selectedCategory === "popular"
            ? tvShows
            : topRatedTVShows;

    // Filter and sort movies
    const filteredAndSortedMovies = useMemo(() => {
        let filteredMovies = displayedMovies.filter((movie) =>
            filter ? movie.genre_ids.includes(Number(filter)) : true
        );
        return filteredMovies
            .filter((movie) => movie.title) // Ensure title exists
            .sort((a, b) =>
                sortOrder === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
    }, [displayedMovies, filter, sortOrder]);

    // Filter and sort TV shows
    const filteredAndSortedTVShows = useMemo(() => {
        let filteredTVShows = displayedTVShows.filter((tvShow) =>
            filter ? tvShow.genre_ids.includes(Number(filter)) : true
        );
        return filteredTVShows
            .filter((tvShow) => tvShow.name) // Ensure name exists
            .sort((a, b) =>
                sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
    }, [displayedTVShows, filter, sortOrder]);

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
                cast,
                filteredAndSortedMovies,
                filteredAndSortedTVShows,
                setFilter,
                setSortOrder,
                genres,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContextProvider;
