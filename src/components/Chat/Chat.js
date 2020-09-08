import React, { useState, useEffect } from "react";
import "./Chat.css";
import firebase from "firebase";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SendIcon from "@material-ui/icons/Send";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../ContextAPI/StateProvider";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  let { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("Rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("Rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => setSeed(Math.floor(Math.random() * 5000)), []);
  return (
    <div className="chatting">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="headerright">
          <div className="headerInfo">
            <h2>{roomName}</h2>
            <p>
              Last Seen{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleTimeString()}
            </p>
          </div>

          <div className="headerIcons">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="chat_main">
        {messages.map((message) => (
          <p
            className={`chat_msg ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
            {message.message}
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a Message"
          />
          <button onClick={sendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
