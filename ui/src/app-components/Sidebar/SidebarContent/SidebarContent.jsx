import React from "react";
import AudienceList from "../../AudienceList/AudienceList";
import AudienceListItem from "../../AudienceListItem/AudienceListItem";
import "./SidebarContent.scss";

export default function SidebarContnet(props) {
    return (<div className="SidebarContent">
        <AudienceList />
    </div>);
}