import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Wall of Love</span>
          <h2 className={styles.title}>Trusted by the best.</h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Main Featured Card */}
          <div className={`${styles.card} ${styles.featured}`}>
            <p className={styles.quote}>
              "Text2Vision didn't just speed up my workflow—it changed how I think about design. The lighting accuracy in the generations is unlike anything else I've used."
            </p>
            <div className={styles.author}>
              <div className={styles.avatarPlaceholder}>SS</div>
              <div>
                <h4 className={styles.name}>Sayyad Shahi</h4>
                <p className={styles.role}>Lead Full-Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Supporting Cards */}
          <div className={styles.card}>
            <p className={styles.smallQuote}>"The best AI generator of 2026. Period."</p>
            <div className={styles.author}>
              <div className={styles.avatarPlaceholder}>SS</div>
              <div>
                <h4 className={styles.name}>Sayyad Shahi</h4>
                <p className={styles.role}>Lead Full-Stack Developer</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.smallQuote}>"Finally, an AI that understands textures and complex prompts."</p>
            <div className={styles.author}>
              <div className={styles.avatarPlaceholder}>SS</div>
              <div>
                <h4 className={styles.name}>Sayyad Shahi</h4>
                <p className={styles.role}>Lead Full-Stack Developer</p>
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.wide}`}>
            <p className={styles.smallQuote}>
              "I went from a raw prompt to a finished marketing campaign in under ten minutes. Absolute magic."
            </p>
           <div className={styles.author}>
              <div className={styles.avatarPlaceholder}>SS</div>
              <div>
                <h4 className={styles.name}>Sayyad Shahi</h4>
                <p className={styles.role}>Lead Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;