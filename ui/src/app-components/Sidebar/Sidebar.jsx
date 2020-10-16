import SiderbarTop from "./SidebarTop/SiderbarTop"

import React from 'react';
import './Siderbar.scss';
import SidebarContent from "./SidebarContent/SidebarContent";
import SidebarBottom from "./SidebarBottom/SidebarBottom";

export default ({ ...props }) => {
  return (
    <div className="Sidebar">
      <SiderbarTop />
      <SidebarContent />
      <SidebarBottom />
    </div>
  )
}