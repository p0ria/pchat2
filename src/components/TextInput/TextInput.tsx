import React, { useState, forwardRef } from 'react';
import "./TextInput.scss";


export default forwardRef(({label, error, ...props}: any, ref) => {
  const [focus, setFocus] = useState(false);
  console.log()
  return (
    <div className={`TextInput ${error ? 'error' : ''} ${focus ? 'focus' : ''}`}>
      <div className="TextInput-Label">
        {label}:
      </div>
      <div className="TextInput-Border">
        <input className="TextInput-Input" type="text"
          onFocus={() => setFocus(true)} 
          onBlur={() => setFocus(false)}
          ref={ref}
          {...props} />
        <div className="TextInput-Error">
          {error}
        </div>
      </div> 
    </div>
  )
})