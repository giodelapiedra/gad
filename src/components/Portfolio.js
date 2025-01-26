import React, { Suspense, memo } from 'react';
import '../appStyles.css';
import cellphoneImg from '../images/cellphone.webp'; // Import your cellphone image
import socialBg from '../images/social.webp'; // Import the social.svg image for background

// Memoize Social Media Buttons to avoid unnecessary re-renders
const MemoizedSocialMediaButtons = memo(() => (
  <div className="social-media-buttons text-center mt-8">
    <a
      href="https://www.facebook.com/GADTanauan"
      className="social-button facebook-button"
      style={{
        backgroundColor: '#1877F2',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginRight: '10px',
        display: 'inline-block',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className="fab fa-facebook"></i> GAD Tanauan
    </a>
    <a
      href="https://www.example.com/cgtv"
      className="social-button cgtv-button"
      style={{
        backgroundColor: '#FF0000',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'inline-block',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className="fab fa-youtube"></i> CGTV
    </a>
  </div>
));

const SocialMediaSection = () => (
  <div
    className="social-media-container"
    style={{
      background: `url(${socialBg}) no-repeat center center`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingTop: '50px',
      position: 'relative',
    }}
  >
    <div
      className="bottom-gradient-border"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        zIndex: 1,
      }}
    />
    <section style={{ position: 'relative', zIndex: 2 }} data-aos="zoom-in-down">
      <div className="header-section text-center py-8">
        <h2 className="text-4xl font-bold uppercase text-black mb-4">Get Updated Social Media</h2>
        <div
          className="gradient-divider mx-auto"
          style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(to right, #8B5CF6, #6D28D9)',
          }}
        />
        <p className="text-xl lg:text-2xl font-medium text-black mt-4">
          Stay connected with our latest updates.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <img
          src={cellphoneImg}
          alt="Cellphone"
          className="bouncing-cellphone"
          loading="lazy" // Lazy load the image to improve performance
          style={{
            width: '90%',
            maxWidth: '1100px',
            height: 'auto',
            marginTop: '-130px',
          }}
        />
      </div>
      {/* Lazy load the Social Media Buttons */}
      <Suspense fallback={<div>Loading...</div>}>
        <MemoizedSocialMediaButtons />
      </Suspense>
    </section>
  </div>
);

export default SocialMediaSection;
