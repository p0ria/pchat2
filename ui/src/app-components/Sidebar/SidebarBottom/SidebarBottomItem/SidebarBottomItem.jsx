import React from "react";
import "./SidebarBottomItem.scss";

export default function SidebarBottomItem({ ...props }) {

    return (<div className="SidebarBottomItem">
        <i className="fa fa-user" {...props} />
    </div>)
}