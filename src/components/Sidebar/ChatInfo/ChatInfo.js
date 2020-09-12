import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Chatinfo.css";
import db from "../../../firebase";
import { Link } from "react-router-dom";

function Chat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => setSeed(Math.floor(Math.random() * 5000)), []);
  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const addClicked = () => {
    const roomName = prompt("Enter New Room Name");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_info">
          <h2>{name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={addClicked} className="chat">
      <h2>Add New Room</h2>
    </div>
  );
}

export default Chat;
