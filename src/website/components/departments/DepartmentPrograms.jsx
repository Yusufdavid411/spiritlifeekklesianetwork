import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../firebase/firebaseConfig";
import {
  hasLikedPost,
  likePostOnce,
  recordPostWatch,
} from "../../../services/engagementAnalytics";
import "./departmentPrograms.css";

const formatNumber = (value) => new Intl.NumberFormat("en").format(value || 0);

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

  if (url.includes("embed/")) {
    return url.split("embed/")[1]?.split("?")[0];
  }

  return null;
};

const getThumbnail = (post) => {
  const videoId = getYoutubeId(post.videoUrl);

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return post.imageUrl || "";
};

const DepartmentPrograms = ({ department }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, department.value),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(postsQuery);
        const list = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setPosts(list);
        setLikedPosts(
          list.reduce(
            (likes, post) => ({
              ...likes,
              [post.id]: hasLikedPost(department.value, post.id),
            }),
            {}
          )
        );
      } catch (error) {
        console.error(`${department.label} posts failed to load:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [department.label, department.value]);

  const pageTotals = useMemo(
    () =>
      posts.reduce(
        (totals, post) => ({
          watches: totals.watches + (post.watchCount || 0),
          likes: totals.likes + (post.likeCount || 0),
        }),
        { watches: 0, likes: 0 }
      ),
    [posts]
  );

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const updatePostCounter = (postId, field) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, [field]: (post[field] || 0) + 1 } : post
      )
    );
  };

  const openPost = async (post) => {
    setSelectedPost(post);

    try {
      await recordPostWatch(department.value, post.id);
      updatePostCounter(post.id, "watchCount");
    } catch (error) {
      console.error("Could not record watch:", error);
    }
  };

  const handleLike = async (event, post) => {
    event.stopPropagation();

    if (likedPosts[post.id]) {
      return;
    }

    setLikedPosts((currentLikes) => ({ ...currentLikes, [post.id]: true }));

    try {
      const liked = await likePostOnce(department.value, post.id);

      if (liked) {
        updatePostCounter(post.id, "likeCount");
      }
    } catch (error) {
      setLikedPosts((currentLikes) => ({ ...currentLikes, [post.id]: false }));
      console.error("Could not like post:", error);
    }
  };

  const renderEngagement = (post, className = "") => (
    <div className={`program-engagement ${className}`} aria-label={`${post.title} engagement`}>
      <div className="program-engagement-item">
        <button
          aria-label={likedPosts[post.id] ? "Already liked" : "Like this item"}
          className={`program-icon-btn ${likedPosts[post.id] ? "liked" : ""}`}
          onClick={(event) => handleLike(event, post)}
          type="button"
        >
          <FontAwesomeIcon icon={likedPosts[post.id] ? solidHeart : regularHeart} />
        </button>
        <span>{formatNumber(post.likeCount)}</span>
      </div>

      <div className="program-engagement-item">
        <span className="program-icon-btn static">
          <FontAwesomeIcon icon={faEye} />
        </span>
        <span>{formatNumber(post.watchCount)}</span>
      </div>
    </div>
  );

  const renderPostMedia = (post, imageClassName) => {
    const thumbnail = getThumbnail(post);

    if (thumbnail) {
      return <img className={imageClassName} src={thumbnail} alt={post.title} />;
    }

    return <div className={`${imageClassName} program-image-fallback`}>{post.title}</div>;
  };

  const renderModalMedia = () => {
    const videoId = getYoutubeId(selectedPost?.videoUrl);

    if (videoId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={selectedPost.title || "Program video"}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    }

    if (selectedPost?.imageUrl) {
      return <img src={selectedPost.imageUrl} alt={selectedPost.title} />;
    }

    return <div className="program-modal-fallback">{selectedPost?.title}</div>;
  };

  return (
    <div className="program-page">
      <button className="program-back-btn" onClick={() => navigate("/")}>
        Back
      </button>

      <section
        className="program-hero"
        style={{ "--program-hero-image": `url(${department.heroImage})` }}
      >
        <div className="program-hero-content">
          <span>{department.badge}</span>
          <h1>{department.title}</h1>
          <p>{department.description}</p>

          <div className="program-page-stats">
            <strong>{formatNumber(posts.length)} posts</strong>
            <strong>{formatNumber(pageTotals.watches)} views</strong>
            <strong>{formatNumber(pageTotals.likes)} likes</strong>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="program-featured-section">
          <div className="program-section-heading">
            <span>Latest Program</span>
            <h2>Featured Upload</h2>
            <p>Start with the newest item from {department.label}.</p>
          </div>

          <div className="program-featured-card">
            <button
              className="program-featured-media"
              onClick={() => openPost(featuredPost)}
              type="button"
            >
              {renderPostMedia(featuredPost, "program-featured-img")}
              <span className="program-play-mark" aria-hidden="true">
                Play
              </span>
            </button>

            <div className="program-featured-info">
              <span>{department.category}</span>
              <h3>{featuredPost.title || "Untitled Program"}</h3>
              <p>
                Watch, revisit, and like this upload. Every play adds to the public
                view count, while each device can like once.
              </p>
              {renderEngagement(featuredPost, "featured")}

              <div className="program-featured-actions">
                <button onClick={() => openPost(featuredPost)} type="button">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="program-library">
        <div className="program-section-heading">
          <span>Programs & Events</span>
          <h2>{department.label} Library</h2>
          <p>Each upload carries its own views and likes.</p>
        </div>

        {loading && (
          <div className="program-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="program-card program-skeleton-card" key={item}>
                <div className="program-skeleton-image" />
                <div className="program-skeleton-line" />
                <div className="program-skeleton-small" />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="program-empty">
            <h3>No uploads yet</h3>
            <p>Programs and events for {department.label} will appear here.</p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="program-grid">
            {otherPosts.map((post) => (
              <article className="program-card" key={post.id}>
                <button
                  className="program-card-media"
                  onClick={() => openPost(post)}
                  type="button"
                >
                  {renderPostMedia(post, "program-card-img")}
                  <span className="program-play-mark small" aria-hidden="true">
                    Play
                  </span>
                </button>

                <div className="program-card-body">
                  <span>{department.category}</span>
                  <h3>{post.title || "Untitled Program"}</h3>
                  {renderEngagement(post)}

                  <div className="program-card-actions">
                    <button onClick={() => openPost(post)} type="button">
                      Watch
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedPost && (
        <div className="program-modal" onClick={() => setSelectedPost(null)}>
          <div className="program-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="program-modal-close"
              onClick={() => setSelectedPost(null)}
              type="button"
            >
              x
            </button>

            <div className="program-modal-media">{renderModalMedia()}</div>

            <div className="program-modal-info">
              <span>{department.label}</span>
              <h3>{selectedPost.title || "Untitled Program"}</h3>
              {renderEngagement(posts.find((post) => post.id === selectedPost.id) || selectedPost)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPrograms;
