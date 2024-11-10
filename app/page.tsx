/* eslint-disable @next/next/no-img-element */
/**
 * Twitter Clone Main Application
 * Provides social media functionality with posts, tabs, and interactive features
 */
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './page.css';

// Data model interfaces
interface PostData {
  id: string;
  title: string;
  imageSrc?: string; // Optional image URL
  text: string;
  category: string;
}

interface PostProps {
  id: string;
  title: string;
  imageSrc?: string;
  text: string;
  category: string;
  onImageClick: (src: string) => void;
  onDelete: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onEditClick: (post: PostData) => void; // Add this
}

/**
 * Post Component
 * Renders individual post with title, optional image, and text content
 * Handles image preview and deletion functionality
 */
const Post: React.FC<PostProps> = ({
  id,
  title,
  imageSrc,
  text,
  category,
  onImageClick,
  onDeleteClick,
  onEditClick
}) => (
  <div className="post-box">
    <div className="post-header">
      <div className="post-title">{title}</div>
      <div className="post-actions">
        <button
          className="edit-button"
          onClick={() => onEditClick({ id, title, text, imageSrc, category })}
          aria-label="Edit post"
        >
          ✎
        </button>
        <button
          className="delete-button"
          onClick={() => onDeleteClick(id)}
          aria-label="Delete post"
        >
          ✕
        </button>
      </div>
    </div>
    {imageSrc ? (
      <img
        src={imageSrc}
        alt="Post"
        className="post-image small"
        onClick={() => onImageClick(imageSrc)}
      />
    ) : null}
    <div className="post-text">{text}</div>
  </div>
);

export default function Home() {
  // Tab and content management
  const [selectedTab, setSelectedTab] = useState('home');
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    postId: string | null;
  }>({
    isOpen: false,
    postId: null
  });

  // New post form state
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    imageSrc: '',
    category: 'home',
  });

  const categories = ['home', 'forYou', 'following'];

  // Fetch posts when tab changes
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', selectedTab);

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [selectedTab]);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles post creation and editing
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, text, imageSrc, category } = newPost;

    try {
      if (editingPost) {
        // Update existing post
        const { data, error } = await supabase
          .from('posts')
          .update({
            title,
            text,
            imageSrc: imageSrc || null,
            category
          })
          .eq('id', editingPost.id)
          .select();

        if (error) {
          console.error('Error updating post:', error);
          alert(`Failed to update post: ${error.message}`);
          return;
        }

        if (data && data[0]) {
          if (category === selectedTab) {
            // Update the post in the current tab
            setPosts(currentPosts =>
              currentPosts.map(post =>
                post.id === editingPost.id ? data[0] : post
              )
            );
          } else {
            // Remove post from current tab if category changed
            setPosts(currentPosts =>
              currentPosts.filter(post => post.id !== editingPost.id)
            );
          }

          // Reset states
          setIsCreatePostModalOpen(false);
          setNewPost({
            title: '',
            text: '',
            imageSrc: '',
            category: 'home',
          });
          setEditingPost(null);
        }
      } else {
        // Create new post logic remains the same...
        const { data, error } = await supabase
          .from('posts')
          .insert([{ title, text, imageSrc, category }])
          .select();

        if (error) {
          console.error('Error adding post:', error.message, error.details);
          alert(`Failed to create post: ${error.message}`);
        } else {
          if (data) {
            // Only update UI if post belongs to current tab
            if (category === selectedTab) {
              setPosts((currentPosts) => [...currentPosts, ...data]);
            }
            setIsCreatePostModalOpen(false);
            setNewPost({
              title: '',
              text: '',
              imageSrc: '',
              category: 'home',
            });
          }
        }
      }

      // Reset state
      setIsCreatePostModalOpen(false);
      setNewPost({
        title: '',
        text: '',
        imageSrc: '',
        category: 'home',
      });
      setEditingPost(null);

    } catch (err) {
      console.error('Exception during post operation:', err);
      alert('An error occurred while saving the post');
    }
  };

  // Image modal handlers
  const handleImageClick = (src: string) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
  };

  /**
   * Handles post deletion
   * Removes post from Supabase and updates local state if successful
   */
  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error.message);
        alert(`Failed to delete post: ${error.message}`);
      } else {
        setPosts((currentPosts) => currentPosts.filter(post => post.id !== id));
      }
    } catch (err) {
      console.error('Exception during post deletion:', err);
    }
  };

  // Delete confirmation handlers
  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({
      isOpen: true,
      postId: id
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmation.postId) {
      await deletePost(deleteConfirmation.postId);
      setDeleteConfirmation({ isOpen: false, postId: null });
    }
  };

  const handleEditClick = (post: PostData) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      text: post.text,
      imageSrc: post.imageSrc || '',
      category: post.category,
    });
    setIsCreatePostModalOpen(true);
  };

  // Client-side rendering setup
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    document.body.classList.add('client-ready');
    return () => {
      document.body.classList.remove('client-ready');
    };
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <div className="container">
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <img src="https://em-content.zobj.net/source/google/412/bird_1f426.png" alt="Bird" className="sidebar-image" />
        <button className="sidebar-button" onClick={() => setSelectedTab('home')}>🏠 Home</button>
        <button className="sidebar-button">🔍 Explore</button>
        <button className="sidebar-button">🔔 Notifications</button>
        <button className="sidebar-button">✉️ Messages</button>
        <button className="sidebar-button">🙂 Profile</button>
        <button className="sidebar-button">⚙️ More</button>
        <button
          className="sidebar-button sidebar-button-bottom"
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          Tweet
        </button>
      </div>

      {/* Main Content Area */}
      <div className="content">
        {/* Tab Navigation */}
        <div className="tabs">
          <div
            className={`tab ${selectedTab === 'home' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('home')}
          >
            Home
          </div>
          <div
            className={`tab ${selectedTab === 'forYou' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('forYou')}
          >
            For You
          </div>
          <div
            className={`tab ${selectedTab === 'following' ? 'selected' : ''}`}
            onClick={() => setSelectedTab('following')}
          >
            Following
          </div>
        </div>

        {/* Post List */}
        {loading ? (
          <div className="loading-spinner">...</div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onImageClick={handleImageClick}
              onDelete={deletePost}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
            />
          ))
        )}
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <input
          type="text"
          className="search-placeholder"
          placeholder="🔍 Search Twitter"
        />

        <div className="verified-section">
          <h3>Get Verified</h3>
          <p>Subscribe to unlock new features.</p>
          <button className="get-verified-button">Get Verified</button>
        </div>

        <div className="trending-section">
          <h3>What&apos;s happening</h3>
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

      {/* Image Preview Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <img src={modalImageSrc} alt="Post" className="modal-image" style={{ height: '80vh', width: 'auto' }} />
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <div
        className={`modal-overlay ${isCreatePostModalOpen ? 'active' : ''}`}
        onClick={() => setIsCreatePostModalOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Create a Post</h2>
            <button
              className="close-button"
              onClick={() => setIsCreatePostModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="Post Title"
              required
            />
            <textarea
              name="text"
              value={newPost.text}
              onChange={handleInputChange}
              placeholder="Post Content"
              required
            />
            <input
              type="url"
              name="imageSrc"
              value={newPost.imageSrc}
              onChange={handleInputChange}
              placeholder="Image URL (optional)"
            />
            <select
              name="category"
              value={newPost.category}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'home' ? 'Home' :
                    category === 'forYou' ? 'For You' :
                      'Following'}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="modal-overlay active" onClick={() => setDeleteConfirmation({ isOpen: false, postId: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Post</h2>
              <button
                className="close-button"
                onClick={() => setDeleteConfirmation({ isOpen: false, postId: null })}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="delete-confirmation-content">
              <p>Are you sure you want to delete this post?</p>
              <div className="delete-confirmation-buttons">
                <button
                  className="cancel-button"
                  onClick={() => setDeleteConfirmation({ isOpen: false, postId: null })}
                >
                  Cancel
                </button>
                <button
                  className="confirm-delete-button"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}