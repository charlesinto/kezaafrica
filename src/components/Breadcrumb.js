import React from "react";
import { Link } from "react-router-dom";
function Breadcrumb({ parent, child, grandChild }) {
  return (
    <section
      className="breadcrumbs"
      style={{ paddingTop: 30 }}
      data-aos="fade-in"
    >
      <div className="container">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          {parent && !child && !grandChild ? (
            <li>{parent.name}</li>
          ) : (
            <li>
              <Link to={parent.link}>{parent.name}</Link>
            </li>
          )}
          {parent.link && child && !grandChild ? (
            <li>{child.name}</li>
          ) : (
            grandChild && (
              <li>
                <Link to={child.link}>{child.name}</Link>
              </li>
            )
          )}
          {grandChild && <li>{grandChild.name}</li>}
        </ol>
        <h2>
          {grandChild ? grandChild.name : child ? child.name : parent.name}
        </h2>
      </div>
    </section>
  );
}

export default Breadcrumb;
