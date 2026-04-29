import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./drama.css";

const Drama = () => {
  const navigate = useNavigate();

  const [dramas, setDramas] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH DRAMA POSTS =================

  useEffect(() => {
    const fetchDrama = async () => {
      try {
        const q = query(collection(db, "drama"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDramas(list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrama();
  }, []);

  // ================= EXTRACT YOUTUBE ID =================

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

  const getThumbnail = (url) => {
    const videoId = getYoutubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  const openVideo = (videoUrl, title) => {
    setSelectedVideo(videoUrl);
    setSelectedTitle(title);
  };

  const featuredDrama = dramas[0];
  const otherDramas = dramas.slice(1);

  return (
    <div className="drama-page">
      {/* ================= BACK BUTTON ================= */}

      <button className="drama-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* ================= HERO SECTION ================= */}

      <section className="drama-hero">
        <div className="drama-hero-overlay"></div>

        <div className="drama-hero-content">
          <span className="drama-badge">SpiritLife Drama Ministry</span>

          <h1>Spiritlife Kingdom Parables</h1>

          <p>
            Watch inspiring kingdom stories, stage ministrations, drama messages,
            and visual teachings that reveal Christ through creativity.
          </p>
        </div>
      </section>

      {/* ================= FEATURED VIDEO ================= */}

      {featuredDrama && (
        <section className="featured-drama-section">
          <div className="section-heading">
            <h2>Latest Release</h2>
            <p>Start watching the newest drama ministration.</p>
          </div>

          <div className="featured-drama-card">
            <div className="featured-image-box">
              <img
                src={getThumbnail(featuredDrama.videoUrl)}
                alt={featuredDrama.title}
              />

              <button
                className="featured-play-btn"
                onClick={() =>
                  openVideo(featuredDrama.videoUrl, featuredDrama.title)
                }
              >
                ▶
              </button>
            </div>

            <div className="featured-info">
              <span className="movie-label">Featured Drama</span>
              <h3>{featuredDrama.title}</h3>

              <p>
                Be blessed as you watch this kingdom-centered drama message from
                SpiritLife Ekklesia Network.
              </p>

              <button
                className="watch-now-btn"
                onClick={() =>
                  openVideo(featuredDrama.videoUrl, featuredDrama.title)
                }
              >
                Watch Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= VIDEO LIBRARY ================= */}

      <section className="drama-library">
        <div className="section-heading">
          <h2>Drama Library</h2>
          <p>Select any drama ministration and start watching.</p>
        </div>

        {loading && (
          <div className="drama-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="drama-card skeleton-card" key={item}>
                <div className="skeleton-img"></div>
                <div className="skeleton-line"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && dramas.length === 0 && (
          <div className="empty-drama">
            <h3>No drama videos yet</h3>
            <p>New drama ministrations will appear here once uploaded.</p>
          </div>
        )}

        {!loading && dramas.length > 0 && (
          <div className="drama-grid">
            {otherDramas.map((drama) => (
              <div
                key={drama.id}
                className="drama-card"
                onClick={() => openVideo(drama.videoUrl, drama.title)}
              >
                <div className="drama-thumbnail">
                  <img src={getThumbnail(drama.videoUrl)} alt={drama.title} />

                  <div className="thumbnail-overlay">
                    <span className="play-circle">▶</span>
                  </div>
                </div>

                <div className="drama-card-content">
                  <span className="drama-category">Kingdom Parable</span>
                  <h4>{drama.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= VIDEO MODAL ================= */}

      {selectedVideo && (
        <div className="drama-modal" onClick={() => setSelectedVideo(null)}>
          <div
            className="drama-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="drama-close"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>

            <div className="modal-video-box">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  selectedVideo
                )}?autoplay=1`}
                title={selectedTitle || "Drama Video"}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="modal-video-info">
              <h3>{selectedTitle}</h3>
              <p>Spiritlife Kingdom Parables</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drama;