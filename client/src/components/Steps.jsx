import React from 'react';
import styles from './Steps.module.css';

const Steps = () => {
  const stepData = [
    {
      number: "01",
      title: "Describe your Vision",
      description: "Type a detailed prompt or just a few keywords. Our AI understands complex lighting, styles, and artistic directions.",
      icon: "✍️"
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Text2Vision analyzes your text and generates four unique high-resolution variations in under 5 seconds.",
      icon: "⚡"
    },
    {
      number: "03",
      title: "Download & Scale",
      description: "Select your favorite masterpiece, upscale it to 4K, and export it in your preferred format instantly.",
      icon: "🖼️"
    }
  ];

  return (
    <section className={styles.stepsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>Transforming ideas into reality is simpler than you think.</p>
        </div>

        <div className={styles.grid}>
          {stepData.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.cardHeader}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {/* Optional: Add a connecting line for desktop view */}
              {index < 2 && <div className={styles.connector}></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;