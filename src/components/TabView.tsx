import { useState, type ReactElement } from "react";
import { type TabProps } from "./Tab.tsx";

interface TabViewProps {
  children: ReactElement<TabProps>[];
}

export const TabView = ({ children }: TabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto dark:bg-gray-600 p-1 rounded-md shadow">
      <div className="flex w-full">
        {children.map((tab, index) => {
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={
                "p-2 dark:text-gray-100 dark:hover:bg-gray-500 hover:bg-gray-200 rounded-t-md hover:underline " +
                (activeTab === index
                  ? "dark:bg-gray-700 bg-gray-200"
                  : "dark:bg-gray-600")
              }
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>
      <div className="p-2 shadow bg-gray-200 dark:bg-gray-700 rounded-t-md">
        {children[activeTab].props.children}
      </div>
    </div>
  );
};
