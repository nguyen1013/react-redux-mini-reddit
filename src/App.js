import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./features/Header/Header";
import Home from "./features/Home/Home";
import Subreddits from "./features/Subreddits/Subreddits";


function App() {
  const [isAsideVisible, setIsAsideVisible] = useState(window.innerWidth > 700);
  useEffect(() => {
    const handleResize = () => {
      setIsAsideVisible(window.innerWidth > 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <button className="toggle-aside-btn" onClick={toggleAside} aria-label="Toggle sidebar">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <aside className={`main-item subreddit-aside ${isAsideVisible ? 'show' : ''}`}>
          <Subreddits />
        </aside>  
        <main className='main-item main-content'>
          <Home />
        </main>
      </div>
    </>
  );
}

export default App;
