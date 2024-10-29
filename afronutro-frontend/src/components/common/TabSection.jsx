import React, { useState, useMemo } from "react";
import ContentCard from "./ContentCard";
import Empty from "./Empty";
import fruits from "../../assets/images/fruits.png";

const TabSection = ({ tabs, filters, contentList }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(filters[0].value);

  // Sort and filter content based on active filter and tab
  const processedContent = useMemo(() => {
    let filtered = [...contentList];

    // Apply content type filter if not on "All" tab
    if (activeTab !== 0) {
      const contentType = tabs[activeTab].label.toLowerCase();
      filtered = filtered.filter(item => item.content_type === contentType);
    }

    // Apply sorting
    switch (activeFilter) {
      case 'last_added':
        return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'recommended':
        return filtered.sort((a, b) => b.recommendation_score - a.recommendation_score);
      default:
        return filtered;
    }
  }, [contentList, activeTab, activeFilter]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
        <ul className="flex flex-wrap -mb-px border-b">
          {tabs.map((tab, index) => (
            <li className="me-2" key={index}>
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  index === activeTab
                    ? "inline-block p-4 text-afro-brown border-b-2 border-afro-brown rounded-t-lg"
                    : "text-gray-500 hover:text-afro-brown"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end">
          <span className="mr-2 text-afro-green font-semibold">Sort by</span>
          <select
            className="rounded-full py-1 px-2 text-afro-gray-mid bg-afro-gray-light border-none text-center outline-none focus:outline-none"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 ">
        {processedContent.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {processedContent.map((content) => (
              <ContentCard
                key={content.content_id}
                title={content.title}
                img={fruits}
                id={content.content_id}
              >
                {content.description}
              </ContentCard>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default TabSection;