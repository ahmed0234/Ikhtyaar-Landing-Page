"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import styles from "./page.module.css";
import Testimonials from "../components/Testimonials";
import ProblemSection from "../components/ProblemSection";
import SolutionSection from "../components/SolutionSection";
import FinalCTASection from "../components/FinalCTASection";

const heroSplitChild = {
  hidden: { opacity: 0, y: 30, rotateX: -90, transformPerspective: 600 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 14, stiffness: 200 },
  },
};

const SplitText = ({ children }: { children: any }) => {
  const childrenString = Array.isArray(children) ? children.join("") : (typeof children === "string" ? children : "");
  const parts = childrenString.match(/\S+|\s+/g) || [];
  let charIndex = 0;
  return (
    <>
      {parts.map((part, i) => {
        if (/\s+/.test(part)) {
          return (
            <span key={`space-${i}`} style={{ display: "inline" }}>
              {part}
            </span>
          );
        }
        return (
          <span
            key={`word-${i}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {part.split("").map((char) => {
              const currentKey = charIndex;
              charIndex++;
              return (
                <motion.span
                  key={currentKey}
                  variants={heroSplitChild}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};

const heroSubtextWord = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SplitSubtext = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          <motion.span
            variants={heroSubtextWord}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i !== words.length - 1 && (
            <span style={{ display: "inline" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movements
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    // Center it initially
    mouseX.set(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
    mouseY.set(typeof window !== "undefined" ? window.innerHeight / 2 : 500);
  }, [mouseX, mouseY]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Creates the spotlight mask for the grid
  const maskImage = useMotionTemplate`radial-gradient(circle 800px at ${springX}px ${springY}px, black, transparent 80%)`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.2,
      },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 1.2,
      },
    },
  };

  return (
    <>
      <div className={styles.heroContainer} onMouseMove={handleMouseMove}>
        {/* Background Animated Blobs for Glassmorphism Context */}
        <div className={styles.blobPurple}></div>
        <div className={styles.blobOrange}></div>
        <div className={styles.blobBlue}></div>

        {/* Infinite Flowing Grid masked with mouse position */}
        {mounted && (
          <motion.div
            className={styles.gridContainer}
            style={{ maskImage, WebkitMaskImage: maskImage }}
          >
            <div className={styles.gridLines}></div>
          </motion.div>
        )}

        {/* Navigation Layer */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 15L10 9L15 14L21 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 8H21V15"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.logoText}>Ikhtyaar</span>
          </div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#about">About We Do</a>
          </nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.navButton}
          >
            Get Started
          </motion.button>
        </motion.header>

        {/* Main Content Area */}
        <main className={styles.content}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.textColumn}
          >
            <motion.div
              variants={itemVariants}
              className={styles.badgeContainer}
            >
              <div className={styles.glassBadge}>
                <span className={styles.badgePulse}></span>
                <span className={styles.badgeText}>
                  Dominate Google Search Results
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={headlineVariants} className={styles.headline}>
              <SplitText>
                If You’re Not Showing Up When People Search for Insurance,{" "}
              </SplitText>
              <br className={styles.breakIfDesktop} />
              <motion.span
                className={styles.highlightWrapper}
                variants={heroSplitChild}
              >
                <span className={styles.highlightText}>
                  <SplitText>You’re Losing Clients</SplitText>
                </span>
                <svg
                  className={styles.highlightUnderlineShape}
                  viewBox="0 0 400 30"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M5 25 Q 200 -5 395 25"
                    stroke="rgba(147, 51, 234, 0.4)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: 1.2,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </motion.span>
              <SplitText> Every Single Day.</SplitText>
            </motion.h1>

            <motion.p variants={subtextVariants} className={styles.subtext}>
              <SplitSubtext text="Watch this short video to see how we help insurance agencies show up on Google and turn those searches into booked calls automatically." />
            </motion.p>

            <motion.div variants={itemVariants} className={styles.ctaGroup}>
              <motion.button
                className={styles.primaryCta}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  idle: {
                    scale: 1,
                    boxShadow: "0px 10px 30px -5px rgba(147, 51, 234, 0.4)",
                  },
                  hover: {
                    scale: 1.05,
                    boxShadow:
                      "0px 30px 60px -12px rgba(147, 51, 234, 0.6), inset 0px 1px 1px rgba(255,255,255,0.8)",
                  },
                  tap: { scale: 0.96 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Continuous Glass Shimmer (Idle Life) */}
                <motion.div
                  className={styles.ctaContinuousShimmer}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Glass Morph Backdrop (Hover State) */}
                <motion.div
                  className={styles.buttonGlassBackdrop}
                  variants={{
                    idle: { opacity: 0, scale: 0.95 },
                    hover: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.2 }}
                />

                <motion.span
                  className={styles.ctaIconWrapper}
                  variants={{
                    idle: {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "#FFFFFF",
                    },
                    hover: {
                      backgroundColor: "rgba(147, 51, 234, 0.15)",
                      color: "#9333EA",
                    },
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </motion.span>
                </motion.span>

                <motion.span
                  className={styles.ctaText}
                  variants={{
                    idle: { color: "#FFFFFF" },
                    hover: { color: "#581C87" },
                  }}
                  transition={{ duration: 0.15 }}
                >
                  Watch the Video Below
                </motion.span>

                {/* Hover Triggered High-Intensity Sweep */}
                <motion.div
                  className={styles.ctaSheenHover}
                  variants={{
                    idle: { left: "-100%", opacity: 0 },
                    hover: { left: "200%", opacity: 1 },
                  }}
                  transition={{ duration: 0.7, ease: "circOut" }}
                />

                {/* Constant Deep Pulse Glow */}
                <motion.div
                  className={styles.ctaPulseGlow}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Video Mockup Area */}
          <motion.div
            className={styles.videoMockup}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: 0.6,
            }}
          >
            <motion.div
              className={styles.glassVideoCard}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setIsVideoModalOpen(true)}
            >
              <div className={styles.glassShine}></div>

              <video
                src="/James.mp4"
                autoPlay
                loop
                muted
                playsInline
                className={styles.videoPreview}
              />

              <div className={styles.playInteractionLayer}>
                <motion.div
                  className={styles.playCircleOuter}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className={styles.playCircleGlow}></div>
                  <div className={styles.playButtonLarge}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="8 5 19 12 8 19 8 5"></polygon>
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Tags for visual flair using Glassmorphism */}
            <motion.div
              className={styles.floatingTag}
              style={{ top: "10%", left: "-6%" }}
              animate={{ y: [-5, 5, -5] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <div className={styles.tagIconGreen}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className={styles.tagText}>+340% Traffic</span>
            </motion.div>

            <motion.div
              className={styles.floatingTag}
              style={{ bottom: "15%", right: "-6%" }}
              animate={{ y: [5, -5, 5] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className={styles.tagIconPurple}>⚡</div>
              <span className={styles.tagText}>High Intent Leads</span>
            </motion.div>
          </motion.div>
        </main>

        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              className={styles.videoModalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                className={styles.videoModalContent}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeModalButton}
                  onClick={() => setIsVideoModalOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <video
                  src="/James.mp4"
                  controls
                  autoPlay
                  className={styles.videoModalPlayer}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Testimonials />
      <ProblemSection />
      <SolutionSection />
      <FinalCTASection />
    </>
  );
}
