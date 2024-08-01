import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./features/Header/Header";
import Home from "./features/Home/Home";
import Subreddits from "./features/Subreddits/Subreddits";


function App() {

  // State to toggle the sidebar when width: 1000px
  const [isAsideVisible, setIsAsideVisible] = useState(window.innerWidth > 1000);

  // Toggle the sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsAsideVisible(window.innerWidth > 1000);
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
