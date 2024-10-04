import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CatList from "./components/catList/CatList";
import DogList from "./components/dogList/DogList";
import CatDetail from "./components/catDetail/CatDetail";
import DogDetail from "./components/dogDetail/DogDetail";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("cats");

  return (
    <Router>
      <div className="App">
        <header>
          <h1>
            <Link to="/">The Dogs & Cats Gallery</Link>
          </h1>
          <nav>
            <button
              className={activeTab === "cats" ? "active" : ""}
              onClick={() => setActiveTab("cats")}
            >
              <Link to="/">Cats</Link>
            </button>
            <button
              className={activeTab === "dogs" ? "active" : ""}
              onClick={() => setActiveTab("dogs")}
            >
              <Link to="/dogs">Dogs</Link>
            </button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CatList />} />
            <Route path="/cat/:id" element={<CatDetail />} />
            <Route path="/dogs" element={<DogList />} />
            <Route path="/dog/:id" element={<DogDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
