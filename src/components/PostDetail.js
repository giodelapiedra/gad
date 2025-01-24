import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // For Open Graph meta tags
import NavBar from '../components/Navbar/NavBar';
import '../post.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts/${postId}?_embed`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const { title, date, excerpt, content, _embedded } = post || {};
  const ogImage = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const fallbackImage = 'https://tanauancity.gov.ph/gad/wp-content/uploads/2024/08/cropped-gad.png';
  const imageToUse = ogImage || fallbackImage;

  const postUrl = `https://tanauancity.gov.ph/gad/post/${postId}`;
  const postDescription = excerpt?.rendered.replace(/<[^>]*>?/gm, '') || '';

  return (
    <div>
      {/* Open Graph Metadata */}
      <Helmet>
        <title>{title?.rendered}</title>
        <meta property="og:title" content={title?.rendered} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:image" content={imageToUse} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title?.rendered} />
        <meta name="twitter:description" content={postDescription} />
        <meta name="twitter:image" content={imageToUse} />
      </Helmet>

      <NavBar />

      <div className="post-detail-container">
        <div className="content-container">
          <header className="post-header">
            <h1 className="post-title">{title?.rendered}</h1>
            <p className="post-meta">
              <span>{new Date(date).toLocaleDateString()}</span>
            </p>
          </header>

          {ogImage && (
            <img
              src={ogImage}
              alt={title?.rendered}
              className="post-image"
            />
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content?.rendered }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
