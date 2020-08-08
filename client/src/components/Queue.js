import React, {useState, useEffect} from "react";
import "./Queue.css";
import QueueItem from "./QueueItem";


const Queue = props => {
  const [queueList, setQueueList] = useState([]);
  const room = props.room;
  
  useEffect(() => {
    props.socketRef.current.emit('fetch-queue-from-session', room);
    props.socketRef.current.on('provide-queuelist', users => {
      setQueueList(users);
    }) 
  }, []);


  // const queueList = [
  //   {title: 'Video1', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png"},
  //   {title: 'Video2', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png"},
  //   {title: 'Video3', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png"},
  //   {title: 'Video4', thumbnail: "https://www.kindpng.com/picc/m/236-2366288_youtube-video-thumbnail-sample-youtube-thumbnail-template-2019.png"}
  // ];
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