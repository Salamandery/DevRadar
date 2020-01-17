import React from 'react';

function DevItem({ dev }) {
    return (
      <li className="dev-item">
        <header>
          <img src={dev.avatar_url} alt="" />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(", ")}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://www.github.com/${dev.user}`}>Acessar GitHub</a>
      </li>
    );
}

export default DevItem;