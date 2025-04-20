"use client";
import { useState } from "react";

let nextId = 0;

export default function Button() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const fetchRandomArticle = async () => {
    setIsLoading(true);

    try {
      // Fetch top stories from Hacker News API
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();

      // Select a random story ID from the list
      const randomIndex = Math.floor(Math.random() * storyIds.length);
      const randomStoryId = storyIds[randomIndex];

      // Fetch the details of the random story to get its URL
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${randomStoryId}.json`);
      const storyData = await storyResponse.json();

      // Check if the story has a URL and open it
      if (storyData && storyData.url) {
        window.open(storyData.url, "_blank");
        // Update article state
        setArticles((prevArticles) => [
          ...prevArticles,
          {
            id: nextId++,
            url: storyData.url,
          },
        ]);
      } else {
        // Fallback to opening the HN discussion if no direct URL is available
        window.open(`https://news.ycombinator.com/item?id=${randomStoryId}`, "_blank");
      }
    } catch (error) {
      console.error("Error fetching random article:", error);
      alert("Failed to fetch a random article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLinks = () => {
    if (articles.length === 0) {
      alert("No links to download yet.");
      return;
    }

    const linkText = articles.map((article) => article.url).join("\n");
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-"); // Format: YYYY-MM-DDTHH-MM-SS-msZ
    const filename = `clicked_links_${timestamp}.txt`;
    const blob = new Blob([linkText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none"; // Ensure the element is not visible
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={fetchRandomArticle}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
          isLoading
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg active:scale-95"
        }`}
        aria-label="Fetch a random article"
      >
        {isLoading ? "Loading..." : "button"}
      </button>
      <p className="mt-4 text-white text-sm text-center">
        click to read a random article from hacker news
      </p>
      {articles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2 text-center">articles</h2>
          <ul className="text-center">
            {articles.map((article) => (
              <li key={article.id} className="mb-1 break-words">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`Open article ${article.url}`}
                >
                  {article.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {articles.length > 0 && (
        <button
          onClick={downloadLinks}
          className="mt-4 px-4 py-2 rounded-lg font-medium text-sm bg-green-500 hover:bg-green-600 text-black hover:shadow-lg active:scale-95"
          aria-label="Download article links"
        >
          download links
        </button>
      )}
    </div>
  );
}