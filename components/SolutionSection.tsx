"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./SolutionSection.module.css";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 50, rotateX: -90, transformPerspective: 600 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 14, stiffness: 200 },
  },
};

const SplitText = ({ children }: { children: string }) => {
  return (
    <>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};

export default function SolutionSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className={styles.headline} variants={container}>
          <SplitText>What We Do Is </SplitText>
          <motion.span
            className={styles.highlight}
            variants={child}
            style={{ display: "inline-block" }}
          >
            Simple
            <span className={styles.highlightUnderline}></span>
          </motion.span>
        </motion.h2>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          We make sure you show up when people search, and we handle the
          follow-up so those leads turn into booked calls.
        </motion.p>

        <motion.p
          className={styles.bottomText}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          That's it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className={styles.ctaWrapper}
        >
          <button className={styles.ctaButton}>Book the Spot</button>
        </motion.div>
      </motion.div>
    </section>
  );
}
