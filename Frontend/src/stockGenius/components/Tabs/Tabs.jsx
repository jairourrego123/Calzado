import React, { useState } from "react";
import "./Tabs.css"; // Asegúrate de agregar estilos adecuados en este archivo

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className="stock-genius-component-tabs-container ">
    <div className="stock-genius-component-tab-list">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`stock-genius-body stock-genius-component-tab ${index === activeTab ? "active" : "desactive"}`}
          onClick={() => handleTabClick(index)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Tabs;
