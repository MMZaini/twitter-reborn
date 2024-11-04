"use client";

import React, { useState } from 'react';
import './page.css';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('Home');

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
        {selectedTab === 'Home' && (
          <>
            <div className="post-box">
              <div className="post-title">Donald Trump Wins Landslide Victory!</div>
              <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_43/3421971/201021-donald-trump-dance-ew-621p.jpg" alt="Post" className="post-image" />
              <div className="post-text">Trumps wins by a landslide!! super cool!!</div>
            </div>
            <div className="post-box">
              <div className="post-title">Home Post Title 2</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the Home post 2.</div>
            </div>
            <div className="post-box">
              <div className="post-title">Home Post Title 3</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the Home post 3.</div>
            </div>
          </>
        )}
        {selectedTab === 'For You' && (
          <>
            <div className="post-box">
              <div className="post-title">For You Post Title 1</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the For You post 1.</div>
            </div>
            <div className="post-box">
              <div className="post-title">For You Post Title 2</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the For You post 2.</div>
            </div>
            <div className="post-box">
              <div className="post-title">For You Post Title 3</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the For You post 3.</div>
            </div>
          </>
        )}
        {selectedTab === 'Following' && (
          <>
            <div className="post-box">
              <div className="post-title">Following Post Title 1</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the Following post 1.</div>
            </div>
            <div className="post-box">
              <div className="post-title">Following Post Title 2</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the Following post 2.</div>
            </div>
            <div className="post-box">
              <div className="post-title">Following Post Title 3</div>
              <img src="https://via.placeholder.com/600x400" alt="Post" className="post-image" />
              <div className="post-text">This is the text at the bottom of the Following post 3.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}