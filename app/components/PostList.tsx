// src/components/PostList.tsx
import React from 'react';
import '../page.css';

interface PostProps {
    title: string;
    imageSrc: string;
    text: string;
    onImageClick: (src: string) => void;
}

const Post: React.FC<PostProps> = ({ title, imageSrc, text, onImageClick }) => (
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

interface PostListProps {
    posts: Omit<PostProps, 'onImageClick'>[];
    onImageClick: (src: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onImageClick }) => (
    <>
        {posts.map((post, index) => (
            <Post key={index} {...post} onImageClick={onImageClick} />
        ))}
    </>
);

export default PostList;