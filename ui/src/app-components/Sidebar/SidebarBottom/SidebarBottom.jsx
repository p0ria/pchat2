import React, { useState } from "react";
import ProfileModal from "../../ProfileModal/ProfileModal";
import "./SidebarBottom.scss";
import SidebarBottomItem from "./SidebarBottomItem/SidebarBottomItem";

export default function SidebarBottom(props) {
    const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);

    return (<div className="SidebarBottom">
        <SidebarBottomItem onClick={() => setProfileModalIsOpen(true)} />
        <ProfileModal
            isOpen={profileModalIsOpen}
            onClickAway={() => setProfileModalIsOpen(false)} />
    </div>)
}