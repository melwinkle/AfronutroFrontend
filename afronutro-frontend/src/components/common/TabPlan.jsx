import React from "react";

const TabPlan = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
        <ul className="flex flex-wrap -mb-px border-b">
          {tabs.map((tab, index) => (
            <li className="me-2" key={index}>
              <a
                className={`inline-block p-4 rounded-t-lg bg-transparent ${
                  index === activeTab
                    ? "text-afro-brown border-b-2 border-afro-brown"
                    : "text-gray-500 hover:text-afro-brown hover:border-gray-300"
                }`}
                onClick={() => onTabChange(index)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {typeof tabs[activeTab].content === 'function' 
          ? tabs[activeTab].content()
          : tabs[activeTab].content
        }
      </div>
    </div>
  );
};

export default TabPlan;