import React from 'react';
import './HomePage.scss';
import Logo from '../../components/Logo/Logo';

export default () => {
  return (
    <div className="HomePage">
      <div className="HomePage-Left">
        <div className="HomePage-Left__Top">
          <Logo />
        </div>
        
      </div>
      <div className="HomePage-Right">

      </div>
    </div>
  )
}