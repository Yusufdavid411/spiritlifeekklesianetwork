import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./PostForm.css";

const PostForm = ({ department, refresh }) => {

  const [title,setTitle] = useState("");
  const [videoUrl,setVideoUrl] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addDoc(collection(db, department), {
      title,
      videoUrl,
      createdAt: serverTimestamp()
    });

    setTitle("");
    setVideoUrl("");

    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>

      <h3>Create Post</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Video Link"
        value={videoUrl}
        onChange={(e)=>setVideoUrl(e.target.value)}
      />

      <button>Publish</button>

    </form>
  );
};

export default PostForm;