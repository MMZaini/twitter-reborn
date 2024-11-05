/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import './page.css';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import VerifiedSection from './components/VerifiedSection';
import TrendingSection from './components/TrendingSection';
import WhoToFollowSection from './components/WhoToFollowSection';
import Modal from './components/Modal';

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
      <Sidebar />
      <div className="content">
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 'Home' && <PostList posts={postsData.Home} onImageClick={handleImageClick} />}
        {selectedTab === 'For You' && <PostList posts={postsData.ForYou} onImageClick={handleImageClick} />}
        {selectedTab === 'Following' && <PostList posts={postsData.Following} onImageClick={handleImageClick} />}
      </div>
      <div className="right-sidebar">
        <SearchBar />
        <VerifiedSection />
        <TrendingSection />
        <WhoToFollowSection />
      </div>
      <Modal isOpen={isModalOpen} imageSrc={modalImageSrc} onClose={handleCloseModal} />
    </div>
  );
}