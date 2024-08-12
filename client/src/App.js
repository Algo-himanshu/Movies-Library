// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import MovieEdit from "./components/MovieEdit";
import MovieDelete from "./components/MovieDelete";
import AddMovie from "./components/AddMovie";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/movies/new" element={<AddMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id/edit" element={<MovieEdit />} />
          <Route path="/movies/:id/delete" element={<MovieDelete />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
