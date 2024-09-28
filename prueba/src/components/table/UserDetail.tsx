// src/components/UserDetail.js
import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "./UserTable.scss";

const UserDetail = () => {
  const { userName, user } = useParams();
  let location = useLocation();
  console.log(location.state);
  return (
    <div className="user-detail">
      <h2>Datos del usuario</h2>
      <p>
        <img
          src={location.state.avatar_url}
          alt={location.state.login}
          className="photo"
        />
      </p>
      <p>
        Url github: <strong>{location.state.html_url}</strong>
      </p>
      <p>
        Usuario: <strong>{userName}</strong>
      </p>
      <Link to="/">Regresar</Link>
    </div>
  );
};

export default UserDetail;
