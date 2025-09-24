import React, { useState } from "react";
import VideoModal from "./VideoModal";
import "./VideoSection.css";
import PlayIcon from "./PlayIcon";

export default function VideoSection() {
  const videos = [
    { src: "/video1.mp4", thumb: "/thumbnail1.webp" },
    { src: "/video2.mp4", thumb: "/thumbnail2.webp" },
    { src: "/video3.mp4", thumb: "/thumbnail3.webp" },
  ];

  const [modalVideo, setModalVideo] = useState(null);

  return (
    <section id="videos" className="video-section" aria-label="Vídeos Abó Filmes">
      {videos.map((video, index) => (
        <div
            className="video-frame"
            onClick={() => setModalVideo(video.src)}
            role="button"
            tabIndex={0}
            >
            <img src={video.thumb} alt={`Vídeo ${index + 1}`} />
            <div className="play-icon-wrapper">
                <PlayIcon size={60} />
            </div>
        </div>
      ))}

      <VideoModal
        videoSrc={modalVideo}
        isOpen={!!modalVideo}
        onClose={() => setModalVideo(null)}
      />
    </section>
  );
}