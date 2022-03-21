import React from "react";

const Information = ({ heading, content }) => {
  return (
    <div className="progressing">
      <div data-aos="fade-up" className="text-center shadow-lg p-3 m-0">
        <h3>{heading}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Information;
