import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Generate from '../components/Generate'
import Testimonials from '../components/Testimonials'
import styles from "./Home.module.css"

const Home = () => {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.sectionInner}>
                    <Hero />
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionSpacing}`}>
                <div className={styles.sectionInner}>
                    <Steps />
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionSpacing}`}>
                <div className={styles.sectionInner}>
                    <Generate />
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionSpacing}`}>
                <div className={styles.sectionInner}>
                    <Testimonials />
                </div>
            </section>
        </div>
    )
}

export default Home