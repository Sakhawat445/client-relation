import React from "react";

export default function HelpBlogPage() {
  const helpArticles = [
    {
      title: "How to Use the Dashboard",
      content:
        "Navigate to the dashboard from the sidebar. Here, you'll see charts and key metrics summarizing your data. You can filter results using the dropdown menus at the top."
    },
    {
      title: "Understanding Sales Charts",
      content:
        "Sales charts visualize performance by country, product, or timeframe. Hover over bars or points to see exact values."
    },
    {
      title: "Troubleshooting Data Sync",
      content:
        "If your data looks outdated, try refreshing or checking your integration settings in the account panel. Still having issues? Contact support."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Help Center</h1>
      {helpArticles.map((article, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            {article.title}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {article.content}
          </p>
        </div>
      ))}
    </div>
  );
}
