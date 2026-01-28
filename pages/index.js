import Link from 'next/link';
import Protected from "../components/Protected";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from '../components/Header'
import { WEDDING_DETAILS } from '../constants';

const pageVariants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      duration: 1.1,
    }
  },
};

const root = typeof document !== 'undefined' ? document.getElementById("__next") : null;

const scrollToTop = () => {
  root?.scrollTo(0, 0);
};

export default function Home() {

  const weddingDate = WEDDING_DETAILS.date;
  const location = WEDDING_DETAILS.location;

  const [fromEnter] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return sessionStorage.getItem('fromEnter') === '1';
  });

  useEffect(() => {
    if (fromEnter) {
      sessionStorage.removeItem('fromEnter');
    }
  }, [fromEnter]);

  return (
    <motion.div
      variants={fromEnter ? pageVariants : {}}
      initial={fromEnter ? "initial" : false}
      animate={fromEnter ? "animate" : false}
      exit={{}}
      className="absolute top-0 left-0 w-full h-full bg-background"
    >
      <Protected>
        <Header />

        {/* Hero Section - Full Screen */}
        <div className="relative h-[85vh] flex items-center justify-center bg-primary overflow-hidden">
          {/* Curved Text - Continuous Flow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg width="200%" height="400%" viewBox="0 0 4000 1500" className="absolute translate-y-0 md:translate-y-20 lg:translate-y-40">
              <defs>
                <path id="curve" d="M -1000,2000 Q 500,-100 1500,400 T 3500,-200" fill="transparent" />
              </defs>
              <text className="fill-secondary text-6xl md:text-8xl font-serif" style={{ fontSize: '120px' }}>
                <motion.textPath
                  href="#curve"
                  initial={{ startOffset: "0%" }}
                  animate={{ startOffset: "-400%" }}
                  transition={{
                    delay: fromEnter ? 2 : 0,
                    duration: 100,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED •
                  WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED •
                  WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED •
                  WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED • WE'RE GETTING MARRIED •
                </motion.textPath>
              </text>
            </svg>
          </div>

          {/* Info Text */}
          <div className="container px-8 text-center z-10 relative mt-20 md:mt-64">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: fromEnter ? 3 : 0.8, duration: 0.8 }}
              className="mt-6 text-xl md:text-2xl lg:text-4xl text-text-light"
            >
              {weddingDate}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: fromEnter ? 3.3 : 1.1, duration: 0.8 }}
              className="mt-2 text-lg md:text-xl lg:text-4xl text-text-light"
            >
              {location}
            </motion.p>
          </div>

          {/* Custom Simple Swoop */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-12 md:h-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 Q800,220 1200,0 L1200,130 L0,120 Z"
                className="fill-background"
              />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-background py-20 px-8">
          <div className="mt-12 container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-text max-w-2xl mx-auto leading-relaxed">
                We'd love for you to celebrate with us. This site has details on the day, travel, and how to RSVP.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                 href="/details"
                  onClick={scrollToTop}
                  className="px-8 py-4 rounded-lg bg-secondary text-text-light font-semibold text-lg shadow-lg hover:bg-secondary-400 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Details
                </Link>
                <Link
                  href="/rsvp"
                  onClick={scrollToTop}
                  className="px-8 py-4 rounded-lg bg-secondary text-text-light font-semibold text-lg shadow-lg hover:bg-secondary-400 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  RSVP
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Protected>
    </motion.div>
  );
}