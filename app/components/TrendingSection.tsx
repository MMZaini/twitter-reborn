import React from 'react';
import '../page.css';

const TrendingSection = () => (
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
);

export default TrendingSection;