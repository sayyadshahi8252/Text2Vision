import { useState } from 'react';
import downloadIcon from "../assets/downloads.png";
import sampleImage from "../assets/gen_4.jpg";
import styles from './GenerateImage.module.css';

import { useDispatch, useSelector } from "react-redux";
import { generateImage } from "../redux/dataSlice/dataSlice";

const GenerateImage = () => {
  const [ prompt, setPrompt ] = useState('');
  const [ status, setStatus ] = useState('idle'); // idle | generating | ready

  const dispatch = useDispatch();
  const { generatedImage, imageLoading, imageError } = useSelector((state) => state.data);

  // 🔥 Generate Image
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus('generating');

    const res = await dispatch(generateImage({ prompt })); // ✅ ONLY prompt

    if (generateImage.fulfilled.match(res)) {
      setStatus('ready');
    } else {
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setPrompt('');
  };

  // 🔥 Download Function
  const downloadImage = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Text2Vision-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        <header className={styles.header}>
          <h1 className={styles.title}>Create with <span>Text2Vision</span></h1>
          <p className={styles.subtitle}>Transform your thoughts into high-resolution reality.</p>
        </header>

        {/* 🔥 IMAGE DISPLAY */}
        <div className={styles.displayArea}>

          {/* Show Image */}
          {(status === 'idle' || status === 'ready') && (
            <img
              src={generatedImage || sampleImage}
              alt="Canvas"
              className={styles.mainImage}
            />
          )}

          {/* Loading Overlay */}
          {status === 'generating' && (
            <div className={styles.queueOverlay}>
              <div className={styles.loader}></div>
              <p>Generating Image...</p>
            </div>
          )}

          {/* Error */}
          {imageError && (
            <div className={styles.errorToast}>
              <span>⚠️ {imageError}</span>
            </div>
          )}
        </div>

        {/* 🔥 ACTION BAR */}
        <div className={styles.inputBar}>
          {status === 'ready' ? (
            <div className={styles.readyActions}>
              <button className={styles.resetBtn} onClick={handleReset}>
                Generate Again
              </button>

              <button className={styles.downloadBtn} onClick={downloadImage}>
                <img src={downloadIcon} alt="" className={styles.icon} />
                Download HD
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see..."
                className={styles.promptInput}
                disabled={status === 'generating'}
              />

              <button
                className={styles.generateBtn}
                onClick={handleGenerate}
                disabled={status === 'generating' || !prompt.trim()}
              >
                {imageLoading ? 'Processing...' : 'Visualize'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;