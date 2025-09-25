import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoModal from "./VideoModal";
import "./VideoSection.css";
import PlayIcon from "./PlayIcon";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const videos = [
    { src: "/video1.mp4", thumb: "/thumbnail1.webp" },
    { src: "/video2.mp4", thumb: "/thumbnail2.webp" },
    { src: "/video3.mp4", thumb: "/thumbnail3.webp" },
  ];

  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    gsap.utils.toArray(".video-frame").forEach((frame) => {
      gsap.fromTo(
        frame,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 80%", // quando 20% do viewport abaixo já vê o frame
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="videos"
      className="video-section"
      aria-label="Vídeos Abó Filmes"
    >
      {videos.map((video, index) => (
        <div
          key={index}
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
