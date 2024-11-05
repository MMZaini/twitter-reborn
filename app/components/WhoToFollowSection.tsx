import React from 'react';
import '../page.css';

const WhoToFollowSection = () => (
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
);

export default WhoToFollowSection;