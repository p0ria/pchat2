import React from 'react';

export default ({fontSize = 16, ...props}) => {
  return (
    <span className="Logo-Text" style={{fontSize: fontSize + 'px'}} {...props}>
      <span className="Logo-Text-Sub">P</span>
      <span className="Logo-Text-Sub color-primary">C</span>
      <span className="Logo-Text-Sub">h</span>
      <span className="Logo-Text-Sub">a</span>
      <span className="Logo-Text-Sub">t</span>
    </span>
  )
}