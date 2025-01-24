import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Importing Helmet for meta tags
import '../appStyles.css'; // Importing the external CSS
import NavBar from '../components/Navbar/NavBar'; // Importing NavBar

const WordPressPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts?_embed');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return (
    <div className="text-center text-red-500">
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()} className="bg-blue-500 text-white p-2 rounded">
        Retry
      </button>
    </div>
  );

  // Limit posts to 20
  const limitedPosts = posts.slice(0, 20);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-24">
      {/* Open Graph and Twitter Card Meta Tags */}
      <Helmet>
        <meta property="og:title" content="Gender Development Articles" />
        <meta
          property="og:description"
          content="Explore various articles on gender development."
        />
        <meta property="og:image" content="https://tanauancity.gov.ph/gad/wp-content/uploads/2024/08/gad2.png" />
        <meta property="og:url" content="https://tanauancity.gov.ph/gad/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gender Development Articles" />
        <meta
          name="twitter:description"
          content="Explore various articles on gender development."
        />
        <meta name="twitter:image" content="https://tanauancity.gov.ph/gad/wp-content/uploads/2024/08/gad2.png" />
      </Helmet>

      <div className="navbar-container">
        <NavBar />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">GENDER DEVELOPMENT ARTICLES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">{post.title.rendered}</h2>
              <Link
                to={`/post/${post.id}`}
                className="text-blue-500 hover:underline font-semibold"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPressPosts;
