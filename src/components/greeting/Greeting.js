import React from "react";
import "./Greeting.css";
import PropTypes from "prop-types";

export default function Greeting({ userName }) {
  return (
    <div className="greeting">
      <h1>Bonjour <span className="firstname">{userName}</span></h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}

Greeting.propTypes = {
  userName: PropTypes.string, 
}