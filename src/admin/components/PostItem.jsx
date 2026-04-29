import React from "react";
import { db } from "../../firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import "./postItem.css";

const PostItem = ({ post, department, refresh }) => {

  const deletePost = async () => {

    await deleteDoc(doc(db, department, post.id));

    refresh();
  };

  return (

    <div style={{
      border:"1px solid #ccc",
      padding:"10px",
      marginBottom:"10px"
    }}>

      <h4>{post.title}</h4>

      <p>{post.videoUrl}</p>

      <button onClick={deletePost}>
        Delete
      </button>

    </div>

  );

};

export default PostItem;