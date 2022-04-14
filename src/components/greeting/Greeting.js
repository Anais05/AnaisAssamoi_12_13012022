import React from "react";
import { useParams, Link } from 'react-router-dom';
import "./Greeting.css";
import PropTypes from "prop-types";

export default function Greeting({ userName }) {
  const userId = useParams().id;
 
  return (
    <div className="greeting">
      <h1>Bonjour <span className="firstname">{userName}</span></h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      {userId === "12" 
        ? <Link className="link" to="/user/18">Voir autre user</Link>
        : <Link className="link" to="/user/12">Voir autre user</Link>
      }
    </div>
  );
}

Greeting.propTypes = {
  userName: PropTypes.string, 
}