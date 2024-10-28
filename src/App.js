import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import MainContextProvider from "./contexts/MainContext";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";

function App() {
    return (
        <BrowserRouter>
            <MainContextProvider>
                    <Routes>
                        <Route path="" element={<Layout />}>
                            <Route path="" element={<Main />}/>
                            <Route path="movies" element={<Movies />}/>
                            <Route path="tvshows" element={<TVShows />}/>
                        </Route>
                        <Route path="*" element={<NotFound></NotFound>} />
                    </Routes>
            </MainContextProvider>
        </BrowserRouter>
    );
}
export default App;
