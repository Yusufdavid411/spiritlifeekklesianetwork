import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./drama.css";

const Drama = () => {

  const [dramas, setDramas] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ================= FETCH DRAMA POSTS =================

  useEffect(() => {

    const fetchDrama = async () => {

      try {

        const q = query(
          collection(db, "drama"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDramas(list);

      } catch (error) {
        console.log(error);
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

  // ================= PAGE =================

  return (

    <div className="drama-page">

      <h2 className="drama-title">
        Drama Department
      </h2>

      <div className="drama-grid">

        {dramas.map((drama) => {

          const videoId = getYoutubeId(drama.videoUrl);

          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : "";

          return (

            <div
              key={drama.id}
              className="drama-card"
              onClick={() => setSelectedVideo(drama.videoUrl)}
            >

              <img
                src={thumbnail}
                alt={drama.title}
              />

              <h4>{drama.title}</h4>

            </div>

          );

        })}

      </div>

      {/* ================= VIDEO MODAL ================= */}

      {selectedVideo && (

        <div
          className="drama-modal"
          onClick={() => setSelectedVideo(null)}
        >

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

            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo)}?autoplay=1`}
              title="Drama Video"
              frameBorder="0"
              allowFullScreen
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default Drama;