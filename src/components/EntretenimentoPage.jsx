import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import VideoModal from './VideoModal';
import { entretenimentoVideos } from '../entretenimentoVideos';
import './EntretenimentoPage.css';

const EntretenimentoPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const shuffledVideos = useMemo(() => {
    const list = [...entretenimentoVideos];

    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });

      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.12'
        );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="entretenimento-page" ref={pageRef}>
      <div className="entretenimento-page-curtain" ref={curtainRef}></div>

      <section className="entretenimento-container" ref={contentRef}>
        <h1 className="entretenimento-main-title">Entretenimento</h1>
      </section>

      <section className="entretenimento-grid" aria-label="Galeria de videos">
        {shuffledVideos.map((video) => (
          <button
            key={video.id}
            type="button"
            className="entretenimento-card"
            onClick={() => setSelectedVideo(video)}
            aria-label={`Abrir video ${video.title}`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="entretenimento-card-image"
            />
            <span className="entretenimento-card-overlay">
              <span className="entretenimento-card-title">{video.title}</span>
            </span>
          </button>
        ))}
      </section>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />

    </main>
  );
};

export default EntretenimentoPage;
