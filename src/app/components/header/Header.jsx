import React from "react";
import "./header.css";
export const Header = ({ headerLinks, brand,width }) => {
  return (
    <div className="border">
      <div className="container" style={{ maxWidth: width }}>
        <div className="header">
          <div className="logo">
            <h1>{brand}</h1>
          </div>
          <div className="content">
            <ul>
              {headerLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.href}>{link.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
