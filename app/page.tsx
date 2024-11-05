/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import './page.css';

const postsData = {
  Home: [
    {
      title: "Donald Trump Wins Landslide Victory!",
      imageSrc: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_43/3421971/201021-donald-trump-dance-ew-621p.jpg",
      text: "Trumps wins by a landslide!! super cool!!"
    },
    {
      title: "Home Post Title 2",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the Home post 2."
    },
    {
      title: "Home Post Title 3",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the Home post 3."
    },
  ],
  ForYou: [
    {
      title: "For You Post Title 1",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the For You post 1."
    },
    {
      title: "For You Post Title 2",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the For You post 2."
    },
    {
      title: "For You Post Title 3",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the For You post 3."
    }
  ],
  Following: [
    {
      title: "Following Post Title 1",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the Following post 1."
    },
    {
      title: "Following Post Title 2",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the Following post 2."
    },
    {
      title: "Following Post Title 3",
      imageSrc: "https://via.placeholder.com/600x400",
      text: "This is the text at the bottom of the Following post 3."
    }
  ]
};

const Post = ({ title, imageSrc, text, onImageClick }) => (
  <div className="post-box">
    <div className="post-title">{title}</div>
    <img
      src={imageSrc}
      alt="Post"
      className="post-image small"
      onClick={() => onImageClick(imageSrc)}
    />
    <div className="post-text">{text}</div>
  </div>
);

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const handleImageClick = (src: string) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src="https://em-content.zobj.net/source/google/412/bird_1f426.png" alt="Bird" className="sidebar-image" />
        <button className="sidebar-button">🏠 Home</button>
        <button className="sidebar-button">🔍 Explore</button>
        <button className="sidebar-button">🔔 Notifications</button>
        <button className="sidebar-button">✉️ Messages</button>
        <button className="sidebar-button">🙂 Profile</button>
        <button className="sidebar-button">⚙️ More</button>
        <button className="sidebar-button sidebar-button-bottom">Tweet</button>
      </div>
      <div className="content">
        <div className="tabs">
          <div
            className={`tab ${selectedTab === 'Home' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('Home')}
          >
            Home
          </div>
          <div
            className={`tab ${selectedTab === 'For You' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('For You')}
          >
            For You
          </div>
          <div
            className={`tab ${selectedTab === 'Following' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('Following')}
          >
            Following
          </div>
        </div>
        {/* Main content based on selected tab goes here */}
        {selectedTab === 'Home' && postsData.Home.map((post, index) => (
          <Post key={index} {...post} onImageClick={handleImageClick} />
        ))}
        {selectedTab === 'For You' && postsData.ForYou.map((post, index) => (
          <Post key={index} {...post} onImageClick={handleImageClick} />
        ))}
        {selectedTab === 'Following' && postsData.Following.map((post, index) => (
          <Post key={index} {...post} onImageClick={handleImageClick} />
        ))}
      </div>
      <div className="right-sidebar">
        {/* Placeholder for Search Bar */}
        <div className="search-placeholder">🔍 Search Twitter</div>

        {/* Get Verified Section */}
        <div className="verified-section">
          <h3>Get Verified</h3>
          <p>Subscribe to unlock new features.</p>
          <button className="get-verified-button">Get Verified</button>
        </div>

        {/* What's Happening Section */}
        <div className="trending-section">
          <h3>What's happening</h3>
          <ul>
            <li>
              <span>Entertainment • Trending</span>
              <h4>Trump</h4>
              <p>21.5K Tweets</p>
            </li>
            <li>
              <span>Comedy • Never-trending</span>
              <h4>Hash shot at park</h4>
              <p>0.001K Tweets</p>
            </li>
            <li>
              <span>News • Trending</span>
              <h4>Kamal found dead at 103</h4>
              <p>5202.1M Tweets</p>
            </li>
            <li>
              <span>Entertainment</span>
              <h4>Jalal found THIS LoL strat?!</h4>
              <p>3.8K Tweets</p>
            </li>
            <li>
              <span>Entertainment</span>
              <h4>Barbie &gt; Oppenheimer</h4>
              <p>1.5K Tweets</p>
            </li>
          </ul>
          <a href="#" className="show-more">Show more</a>
        </div>

        {/* Who to Follow Section */}
        <div className="who-to-follow-section">
          <h3>Who to follow</h3>
          <ul>
            <li>
              <div className="profile-info">
                <img src="https://via.placeholder.com/50" alt="Profile" />
                <div>
                  <h4>Mahdi Zaini</h4>
                  <span>@zaini</span>
                </div>
              </div>
              <button className="follow-button">Follow</button>
            </li>
            <li>
              <div className="profile-info">
                <img src="https://via.placeholder.com/50" alt="Profile" />
                <div>
                  <h4>Ali Zaini</h4>
                  <span>@aros</span>
                </div>
              </div>
              <button className="follow-button">Follow</button>
            </li>
            <li>
              <div className="profile-info">
                <img src="https://via.placeholder.com/50" alt="Profile" />
                <div>
                  <h4>Rizzler</h4>
                  <span>@rizz</span>
                </div>
              </div>
              <button className="follow-button">Follow</button>
            </li>
          </ul>
          <a href="#" className="show-more">Show more</a>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <img
              src={modalImageSrc}
              alt="Post"
              className="modal-image"
              style={{ height: '80vh', width: 'auto' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}