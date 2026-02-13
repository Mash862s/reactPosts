import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, такой страницы не существует</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
