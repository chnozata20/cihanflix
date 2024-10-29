import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import MainContextProvider from "./contexts/MainContext";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MovieContextProvider from "./contexts/MovieContext";
import Product from "./pages/Product";
import Category from "./pages/Category";

function App() {
    return (
        <BrowserRouter>
            <MainContextProvider>
                <MovieContextProvider>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="" element={<Layout />}>
                            <Route
                                path="/movie/:mediaId"
                                element={<Product />}
                            />
                            <Route
                                path="/tvshow/:mediaId"
                                element={<Product />}
                            />
                            <Route path="movies" element={<Category/>} />
                            <Route path="tvshows" element={<Category />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MovieContextProvider>
            </MainContextProvider>
        </BrowserRouter>
    );
}
export default App;
