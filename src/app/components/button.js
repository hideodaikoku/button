"use client"
import { useState } from 'react';

export default function Button() {
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchRandomArticle = async () => {
    setIsLoading(true);
    
    try {
      // Fetch top stories from Hacker News API
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds = await response.json();
      
      // Select a random story ID from the list
      const randomIndex = Math.floor(Math.random() * storyIds.length);
      const randomStoryId = storyIds[randomIndex];
      
      // Fetch the details of the random story to get its URL
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${randomStoryId}.json`);
      const storyData = await storyResponse.json();
      
      // Check if the story has a URL and open it
      if (storyData && storyData.url) {
        window.open(storyData.url, '_blank');
      } else {
        // Fallback to opening the HN discussion if no direct URL is available
        window.open(`https://news.ycombinator.com/item?id=${randomStoryId}`, '_blank');
      }
    } catch (error) {
      console.error('Error fetching random article:', error);
      alert('Failed to fetch a random article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={fetchRandomArticle}
        disabled={isLoading}
        className={`
          px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200
          ${isLoading ? 
            'bg-gray-400 text-gray-700 cursor-not-allowed' : 
            'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg active:scale-95'
          }
        `}
      >
        {isLoading ? 'loading...' : 'button'}
      </button>
      <p className="mt-4 text-gray-600 text-sm">
        click to read a random article from hacker news
      </p>
    </div>
  );
}