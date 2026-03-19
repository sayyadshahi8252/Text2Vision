import React from 'react';
import styles from './Hero.module.css';
import Button from './Button'; // Reusable Button component
import img1 from "../assets/gen_1.png"; 
import img2 from "../assets/gen_2.png";
import img3 from "../assets/gen_3.jpg";
import img4 from "../assets/gen_4.jpg";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        
        {/* Top Tagline */}
        <div className={styles.taglineWrapper}>
          <span className={styles.taglinePill}>
            AI-POWERED CREATIVITY <span className={styles.sparkle}>✨</span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className={styles.headline}>
          Transform text into <span className={styles.visualHighlight}>stunning visuals</span> instantly.
        </h1>

        {/* Sub-description */}
        <p className={styles.description}>
          Unleash the full potential of your imagination. Text2Vision seamlessly converts simple prompts into photorealistic images, compelling art, and unique designs—all in under 5 seconds.
        </p>

        {/* Call to Action */}
        <div className={styles.ctaWrapper}>
          <Button text="Start Generating for Free" variant="primary" />
          <button className={styles.secondaryBtn}>Explore Showcase</button>
        </div>

        {/* Preview Gallery - Single unique asset per generation */}
        <div className={styles.galleryWrapper}>
          <div className={styles.gallery}>
            <img src={img1} alt="Generated AI Visual 1" className={styles.galleryItem} />
            <img src={img2} alt="Generated AI Visual 2" className={styles.galleryItem} />
            <img src={img3} alt="Generated AI Visual 3" className={styles.galleryItem} />
            <img src={img4} alt="Generated AI Visual 4" className={styles.galleryItem} />
          </div>
          <p className={styles.galleryCaption}>RECENT CREATIONS FROM TEXT2VISION COMMUNITY</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;