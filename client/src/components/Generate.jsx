import React from 'react';
import styles from './Generate.module.css';
import sample1 from "../assets/gen_2.png";
import sample2 from "../assets/gen_3.jpg";

const Generate = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Staggered Images */}
        <div className={styles.imageGrid}>
          <div className={styles.mainImageWrapper}>
            <img src={sample1} alt="AI Generated Art" className={styles.imgOne} />
          </div>
          <div className={styles.secondaryImageWrapper}>
            <img src={sample2} alt="AI Character Design" className={styles.imgTwo} />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>
            Introducing the AI-Powered <br /> 
            <span>Text to Image Generator</span>
          </h2>
          <p className={styles.description}>
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p className={styles.subDescription}>
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Generate;