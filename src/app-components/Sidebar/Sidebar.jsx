import SiderbarTop from "./SidebarTop/SiderbarTop"

import React from 'react';
import './Siderbar.scss';

export default ({...props}) => {
  return (
    <div className="Sidebar">
      <SiderbarTop />
    </div>
  )
}