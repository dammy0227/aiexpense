import React from "react";
import "./InsightsCard.css";

const InsightsCard = ({ title, message }) => {
  return (
    <div className="insights-card">
      {title && <h4>{title}</h4>}
      <p dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export default InsightsCard;
