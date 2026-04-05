import { useEffect } from 'react';
import './VideoModal.css';

const getVimeoEmbedUrl = (video) => {
  if (!video) return null;

  if (video.vimeoId) {
    return `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1`;
  }

  if (!video.vimeoUrl) return null;

  const match = video.vimeoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match?.[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
  }

  return video.vimeoUrl;
};

export default function VideoModal({ video, videoSrc, isOpen, onClose }) {
  const activeVideo = video || (videoSrc ? { type: 'mp4', src: videoSrc } : null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !activeVideo) return null;

  const embedUrl = getVimeoEmbedUrl(activeVideo);
  const isVimeo = Boolean(embedUrl) || activeVideo.type === 'vimeo';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        {isVimeo ? (
          <iframe
            src={embedUrl}
            title={activeVideo.title || 'Video Vimeo'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={activeVideo.src || activeVideo.videoSrc} controls autoPlay playsInline />
        )}
        <button className="close-button" onClick={onClose} aria-label="Fechar modal de video">
          ×
        </button>
      </div>
    </div>
  );
}