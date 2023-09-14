import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import { RegisterPage } from "./Components/RegisterPage";
import Movies from "./Components/Pages/Movies";
import Trending from "./Components/Pages/Trending";
import TopRated from "./Components/Pages/TopRated";
import NowPlaying from "./Components/Pages/NowPlaying";
import HomePage from "./Components/HomePage";
import TvSeries from "./Components/Pages/TvSeries";
import ContentModal from "./Components/ContentModal";
import ProfilePage from "./Components/Pages/ProfilePage";
import ForgotPassword from "./Components/ForgotPassword";
import LoginPage from "./Components/LoginPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} /> 
          {/* <Route path="/LoginPage" element={<LoginPage/>} /> */}
          {/* <Route path="/RegisterPage" element={<RegisterPage />} /> */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/TopRated" element={<TopRated />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/TvSeries" element={<TvSeries />} />
          <Route path="/ContentModal" element={<ContentModal />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
