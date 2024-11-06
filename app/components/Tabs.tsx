// src/components/Tabs.tsx
import React from 'react';
import '../page.css';

interface TabsProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, setSelectedTab }) => (
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
);

export default Tabs;