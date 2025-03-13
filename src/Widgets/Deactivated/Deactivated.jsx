import React from "react";
import "./Deactivated.scss";

export const Deactivated = () => {
  return (
    <div className="all">
      <div className="container">
        <div className="all__inner">
          <div className="all__deactivated">
            <h2 className="all__deactivated-title">Deactivated</h2>
            <p className="all__deactivated-text">
              Please contact NGO Team to activate the access to
              NGO Talent Pool via
            </p>
            <a
              className="all__deactivated-link"
              href="mailto:pranavzhawar2022@vitbhopal.ac.in"
            >
              pranavzhawar2022@vitbhopal.ac.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
