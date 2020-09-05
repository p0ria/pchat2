import React, { useContext } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';

const checkVariants = {
  hidden: {
    scale: 0, 
    pathLength: 0
  },
  visible: {
    scale: 1,
    pathLength: 1,
    rotateZ: 20,
    transition: { 
      duration: 1, 
      delay: 1, 
      rotateZ: {
        yoyo: 9,
        delay: 2,
        duration: .2
      }},
  }
}

export default ({...props}) => {
  const [theme] = useContext(ThemeContext);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
      width="210"
      height="180"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 35 80 L 80 120 L 170.808 40"
        fill="transparent"
        strokeWidth="60"
        stroke={theme.colors.success}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{pathLength, opacity}}
        variants={checkVariants}
        origin="0"
      >
      </motion.path>
    </motion.svg>
  )
}