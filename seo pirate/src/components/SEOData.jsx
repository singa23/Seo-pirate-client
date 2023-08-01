import React from "react";
import SEOElement from "./SEOElement";

function SEOData({ seoData }) {
  if (!seoData) {
    return <p>No SEO data available the website might no exist</p>;
  }

  return (
    <div>
      {Object.keys(seoData).map((key, index) => (
        <SEOElement key={index} elementName={key} content={seoData[key]} />
      ))}
    </div>
  );
}

export default SEOData;
