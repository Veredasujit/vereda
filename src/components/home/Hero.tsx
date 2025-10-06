'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.3,
        ease: "easeOut"
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    },
    animate: {
      y: [0, -25, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 }
    }
  };

  return (
    <section className="min-h-screen p-9 flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Left Content */}
        <motion.div className="flex-1 text-center lg:text-left space-y-8 lg:space-y-10 max-w-2xl">
          {/* Main Heading */}
          <motion.div className="space-y-2" variants={textVariants}>
            
            <h1 className="text-xl flex gap-3 sm:text-xl lg:text-xl xl:text-xl font-bold text-gray-900 leading-tight">
              <span className="block">ONLINE</span>
              <motion.span
                className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                EDUCATION
              </motion.span>
            </h1>

            <motion.div
              className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto lg:mx-0"
              whileHover={{ width: 160 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Subheading */}
          <motion.div className="" variants={textVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-semibold text-gray-800 ">
              Up Your Skills.
              <motion.span
                className="block text-gray-900 "
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                To Advance Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  Career Path
                </span>
              </motion.span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-gray-600  max-w-xl mx-auto lg:mx-0"
            variants={textVariants}
          >
            Digital Training Program by India's Leading Experts.
            <span className="block mt-1 font-medium text-gray-700">
              Join many Learners today, acquire a tech skill.
            </span>
          </motion.p>

          

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
            variants={textVariants}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="group border-2 border-blue-600 text-blue-600 font-semibold py-4 px-10 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Request Call Back
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end relative"
          variants={imageVariants}
          initial="hidden"
          animate={inView ? ["visible", "animate"] : "hidden"}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-lg opacity-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <Image
              src="/images/hero1.png"
              alt="Online Education Hero Illustration"
              width={400}
              height={300}
              className="relative drop-shadow-2xl rounded-2xl"
              priority
            />
            
            
            
            
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}