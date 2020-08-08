import React from "react";
import "./QueueItem.css";

const QueueItem = props => {
  return (
    <li className="queue-li">
      <img className="thumbnail-img" src={props.item.thumbnail}></img>
      <div className="info">
        <p className="title">{props.item.title}</p>
      </div>
    </li>
  );
}

export default QueueItem;