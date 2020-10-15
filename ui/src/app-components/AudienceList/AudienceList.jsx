import React from "react";
import { useSelector } from "react-redux";
import { selectAudiences } from "../../state/audience/audience.selectors";
import AudienceListItem from "../AudienceListItem/AudienceListItem";
import "./AudienceList.scss";

export default function AudienceList(props) {
    const audiences = useSelector(selectAudiences);
    return (<div className="AudienceList">
        {
            audiences.map(audience => (<AudienceListItem key={audience._id}
                name={audience.name}
                avatarUrl={audience.avatarUrl}
            />))
        }
    </div>)
}