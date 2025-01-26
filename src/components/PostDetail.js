import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavBar from "../components/Navbar/NavBar";
import "../post.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts/${postId}?_embed`
        );

        if (!response.ok) {
          throw new Error(`Error fetching post: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the entire response data to check for the necessary fields

        if (isMounted) setPost(data);

        const featuredMediaId = data?.featured_media;

        // If featured_media exists, fetch the thumbnail image
        if (featuredMediaId) {
          const mediaResponse = await fetch(
            `https://tanauancity.gov.ph/gad/wp-json/wp/v2/media/${featuredMediaId}`
          );

          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            console.log(mediaData); // Log the media data to check the image URL
            setThumbnail(mediaData.source_url);
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  const { title, date, excerpt, content } = post;
  const ogImage = thumbnail || "https://tanauancity.gov.ph/gad/wp-content/uploads/2024/08/cropped-gad.png"; // Default image if no thumbnail
  const postUrl = `https://tanauancity.gov.ph/gad/post/${postId}`;
  const postTitle = title?.rendered || "Post Title";
  const postDescription = (excerpt?.rendered.replace(/<[^>]*>?/gm, "") || "Post description").substring(0, 160);

  return (
    <div>
      <Helmet>
        {/* Dynamic Open Graph meta tags */}
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={postDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />

        {/* Dynamic Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postTitle} />
        <meta name="twitter:description" content={postDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <NavBar />

      <div className="post-detail-container">
        <div className="content-container">
          <header className="post-header">
            <h1 className="post-title">{postTitle}</h1>
            <p className="post-meta">
              <span>{new Date(date).toLocaleDateString()}</span>
            </p>
          </header>

          {/* Display dynamic thumbnail image */}
          {ogImage && (
            <img
              src={ogImage}
              alt={postTitle}
              className="post-image"
            />
          )}

          {/* Display post content */}
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
