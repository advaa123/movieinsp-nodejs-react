import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import NoPage from "./pages/NoPage";
import MoviePage from "./pages/MoviePage";
import { MoviesBody } from "./components/Movies";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RequireAuth from "./components/Auth/RequireAuth";
import MyFavoriteMovies from "./pages/MyFavoriteMovies";
import About from "./pages/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<MoviesBody />} />
        <Route path="/404" element={<NoPage />} />
        <Route path="movies-playing" element={<MoviesBody />} />
        <Route path="top-rated" element={<MoviesBody />} />
        <Route path="upcoming" element={<MoviesBody />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="favorites" element={<MyFavoriteMovies />} />
        <Route path="search/:term" element={<MoviesBody />} />
        <Route path="*" element={<NoPage />} />
        <Route path="movie/:id" exact element={<MoviePage />} />
        <Route path="about" element={<About />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
