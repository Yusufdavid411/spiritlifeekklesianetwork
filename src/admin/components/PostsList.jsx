import React from "react";
import { db } from "../../firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const PostsList = ({ posts, department, refresh }) => {
  const getYoutubeId = (url) => {
    if (!url) return null;

    if (url.includes("shorts")) {
      return url.split("shorts/")[1]?.split("?")[0];
    }

    if (url.includes("watch?v=")) {
      return url.split("watch?v=")[1]?.split("&")[0];
    }

    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }

    return null;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;

    await deleteDoc(doc(db, department, id));
    refresh();
  };

  if (posts.length === 0) {
    return (
      <div className="empty-posts">
        <h4>No posts yet</h4>
        <p>Uploaded content for this department will appear here.</p>
      </div>
    );
  }

  return (
    <div className="admin-posts-list">
      {posts.map((post) => {
        const videoId = getYoutubeId(post.videoUrl);

        return (
          <div className="admin-post-card" key={post.id}>
            {videoId ? (
              <div className="admin-video-preview">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={post.title || "Video Preview"}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="admin-no-video">
                <p>No video preview available</p>
              </div>
            )}

            <div className="admin-post-info">
              <h4>{post.title || "Untitled Post"}</h4>

              {post.videoUrl && (
                <a href={post.videoUrl} target="_blank" rel="noreferrer">
                  Open on YouTube
                </a>
              )}

              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;