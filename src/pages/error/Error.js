import { React } from "react";
import "./Error.css";

export default function Error() {
  return (
    <div className="error">
      <h1 className="title">Erreur 404</h1>
      <p className="subtitle">utilisateur introuvable</p>
    </div>
  );
}