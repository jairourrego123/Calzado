import React, { useState } from "react";
import "./TabsDetail.css"; // Asegúrate de agregar estilos adecuados en este archivo
import Icon from "../Icon/Icon";

const TabsDetail = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className="stock-genius-component-tabs-detail-container ">
    <div className="stock-genius-component-tab-detail-list">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`stock-genius-body stock-genius-component-tab-detail ${index === activeTab ? "active" : "desactive"}`}
          onClick={() => handleTabClick(index)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default TabsDetail;
