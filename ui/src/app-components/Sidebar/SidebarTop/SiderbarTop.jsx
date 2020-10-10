import React from 'react';
import Logo  from '../../Logo/Logo';
import './SiderbarTop.scss';
import AnimatedLogoText from '../../AnimatedLogoText/AnimatedLogoText';

export default () => {
  return (
    <div className="SidebarTop">
      <Logo />
      <AnimatedLogoText />
    </div>
  )
}