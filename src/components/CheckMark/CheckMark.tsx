import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';

const checkVariants = {
  hidden: {
    scale: .85, 
    pathLength: 0
  },
  visible: {
    scale: 1,
    pathLength: 1,
    transition: { duration: 1, delay: 1 }
  }
}

export default ({...props}) => {
  const [theme] = useContext(ThemeContext);
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
        style={{pathLength: 1}}
        variants={checkVariants}
      >
      </motion.path>
    </motion.svg>
  )
}