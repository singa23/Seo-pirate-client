import React, { useState } from "react";

function SEOElement({ elementName, content }) {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div onClick={handleClick} role="button">
      <strong>{elementName}:</strong>
      {showContent && Array.isArray(content) && (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SEOElement;
