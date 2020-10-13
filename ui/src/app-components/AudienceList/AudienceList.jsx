import React from "react";
import AudienceListItem from "../AudienceListItem/AudienceListItem";
import "./AudienceList.scss";

export default function AudienceList(props) {
    return (<div className="AudienceList">
        <AudienceListItem name="Mohammad"
            avatarUrl="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" />
        <AudienceListItem name="Mohammad"
            avatarUrl="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" />
    </div>)
}