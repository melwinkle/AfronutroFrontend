import React from 'react';

const TabSortSection = ({ tabs, activeTab, setActiveTab, filters, activeFilter, setActiveFilter,onSearch,searchQuery}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4  bg-white  rounded ">
      <div className="flex-grow">
      <input
          type="text"
          className="w-11/12 border border-afro-green rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-afro-green"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex justify-center ">
        <ul className="flex flex-wrap lg:flex-nowrap -mb-px  ">
          {tabs.map((tab, index) => (
            <li key={index} className="me-3 pt-2 lg:pt-0">
              <a
                href="#"
                className={`inline-block px-4 py-2 rounded hover:text-white hover:border-gray-300 ${
                  index === activeTab
                    ? "text-white border bg-afro-green"
                    : "text-gray-500 hover:text-afro-green border border-afro-green"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
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
  );
};

export default TabSortSection;