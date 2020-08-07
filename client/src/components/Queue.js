import React from "react";
import "./Queue.css";
import QueueItem from "./QueueItem";


const Queue = props => {
  const queueList = [
    {url: 1, title: 'Video1', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png", user: "Chaim1"},
    {url: 2, title: 'Video2', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png", user: "Chaim2"},
    {url: 3, title: 'Video3', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png", user: "Chaim3"},
    {url: 4, title: 'Video4', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png", user: "Chaim4"}
  ];
  const queueListComponents = queueList.map(queueItem => <QueueItem item={queueItem}/>);
    return (
        <div>
          <ul className="queue-list">
            {queueListComponents}
          </ul>
        </div>
    );
}

export default Queue;