import React from "react";
import "./VideoModal.css";

export default function VideoModal({ videoSrc, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <video src={videoSrc} controls autoPlay />
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}