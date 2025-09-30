import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoModal from "./VideoModal";
import "./VideoSection.css";
import PlayIcon from "./PlayIcon";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const videos = [
    {
      src: "/video1.mp4",
      thumb: "/thumbnail1.webp",
      alt: "Making of vídeo 1 da Abó Filmes",
    },
    {
      src: "/video2.mp4",
      thumb: "/thumbnail2.webp",
      alt: "Making of vídeo 2 da Abó Filmes",
    },
    {
      src: "/video3.mp4",
      thumb: "/thumbnail3.webp",
      alt: "Making of vídeo 3 da Abó Filmes",
    },
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Função para teclado: Enter ou Space abre modal
  const handleKeyDown = (event, videoSrc) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setModalVideo(videoSrc);
    }
  };

  return (
    <section
      id="videos"
      className="video-section"
      aria-label="Galeria de vídeos Abó Filmes"
    >
      {videos.map((video, index) => (
        <div
          key={index}
          className="video-frame"
          onClick={() => setModalVideo(video.src)}
          onKeyDown={(e) => handleKeyDown(e, video.src)}
          role="button"
          tabIndex={0}
          aria-label={`Abrir vídeo ${index + 1}`}
        >
          <picture>
            {/* WebP otimizado */}
            <source srcSet={video.thumb} type="image/webp" />
            {/* Fallback JPEG/PNG */}
            <img
              src={video.thumb.replace(".webp", ".jpg")}
              alt={video.alt}
              loading="lazy"
              width="1366"
              height="768"
            />
          </picture>
          <div className="play-icon-wrapper">
            <PlayIcon size={60} aria-hidden="true" />
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
