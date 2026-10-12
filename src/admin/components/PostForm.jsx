import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./PostForm.css";

const PostForm = ({ department, refresh }) => {

  const [title,setTitle] = useState("");
  const [videoUrl,setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addDoc(collection(db, department), {
      title,
      videoUrl,
      imageUrl,
      watchCount: 0,
      likeCount: 0,
      createdAt: serverTimestamp()
    });

    setTitle("");
    setVideoUrl("");
    setImageUrl("");

    refresh();
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>

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

      <input
        type="text"
        placeholder="Image Link (optional)"
        value={imageUrl}
        onChange={(e)=>setImageUrl(e.target.value)}
      />

      <button>Publish</button>

    </form>
  );
};

export default PostForm;
