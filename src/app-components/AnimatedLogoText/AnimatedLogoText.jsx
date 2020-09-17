import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedLogoText.scss';

const textVariant = {
  jump: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
const letterVariant = {
  jump: {
    y: [0, -20, 0],
    transition: {
      duration: 1
    }
  }
}
export default ({...props}) => {
  return (
    <motion.div className="AnimatedLogoText"
      variants={textVariant}
        initial={false}
        animate="jump"
      >
        <motion.span
          variants={letterVariant}>P</motion.span>
        <motion.span
          variants={letterVariant}>C</motion.span>
        <motion.span
          variants={letterVariant}>H</motion.span>
        <motion.span
          variants={letterVariant}>A</motion.span>
        <motion.span
          variants={letterVariant}>T</motion.span>
        <motion.span
          variants={letterVariant}>2</motion.span>
    </motion.div>
  )
}