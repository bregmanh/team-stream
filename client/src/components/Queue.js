import React, { useState, useEffect } from "react";
import "./Queue.css";
import QueueItem from "./QueueItem";

const Queue = (props) => {
  const [queueList, setQueueList] = useState([]);
  const room = props.room;

  useEffect(() => {
    props.socketRef.current.emit("fetch-queue-from-session", room);
    props.socketRef.current.on("provide-queuelist", (queue) => {
      setQueueList(queue);
    });
  }, []);

  const queueListComponents = queueList.map((queueItem) => (
    <QueueItem item={queueItem} key={queueItem.id}/>
  ));
 
  return (
    <div className="queue-list-container">
      <ul className="queue-list">{queueListComponents}</ul>
    </div>
  );
};

export default Queue;
