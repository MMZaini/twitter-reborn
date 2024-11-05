import React from 'react';
import '../page.css';

const Sidebar = () => (
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
);

export default Sidebar;