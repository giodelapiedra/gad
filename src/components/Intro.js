import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WordPressPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Abort Controller to cancel fetch on unmount
    const fetchPosts = async () => {
      try {
        // Fetch posts filtered by category ID 14 (News category)
        const response = await fetch(
          'https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts?_embed&categories=14', 
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      controller.abort(); // Cancel fetch on component unmount
    };
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const limitedPosts = posts.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        GENDER AND DEVELOPMENT - NEWS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedPosts.map((post) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          return (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-48 object-cover"
                  loading="lazy" // Lazy loading for images
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div> // Better placeholder feedback
              )}
              <div className="p-4">
                <h2
                  className="text-xl font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordPressPosts;
