import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import Contact from './pages/Articales';
import DemoProduct from './pages/DemoProduct';
import Database2 from './pages/Database';
import { useDocTitle } from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';
// Import PostDetail
import PostDetail from './components/PostDetail';  // Make sure to adjust the path

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    };

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("GAD | GENDER AND DEVELOPMENT");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Articales" element={<Contact />} />
            <Route path="/database" element={<Database2 />} />
            <Route path="/get-demo" element={<DemoProduct />} />
            {/* Add the new route for post details */}
            <Route path="/post/:postId" element={<PostDetail />} /> {/* Dynamically fetches postId */}
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
