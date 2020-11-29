import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAudiences } from "../../state/audience/audience.selectors";
import { motion } from "framer-motion";
import AudienceListItem from "../AudienceListItem/AudienceListItem";
import "./AudienceList.scss";
import { actionSelectAudience } from "../../state/chat/chat.actions";
import { selectSelectedAudience } from "../../state/chat/chat.selectors";

const listVariants = {
    initial: {
        opacity: 0
    },
    rest: {
        opacity: 1,
        transition: {
            delayChildren: 1,
            staggerChildren: .5
        }
    }
}

export default function AudienceList(props) {
    const audiences = useSelector(selectAudiences);
    const selectedAudience = useSelector(selectSelectedAudience);
    const dispatch = useDispatch();
    const handleSelectAudience = audienceId => {
        dispatch(actionSelectAudience(audienceId));
    }
    if (!audiences.length) return '';
    return (<motion.div className="AudienceList"
        variants={listVariants}
        initial="initial"
        animate="rest"
    >
        {
            audiences.map(audience => <AudienceListItem
                key={audience._id}
                name={audience.name}
                avatarUrl={audience.avatarUrl}
                onClick={() => handleSelectAudience(audience._id)}
                active={selectedAudience && selectedAudience._id == audience._id}
            />)
        }
    </motion.div>)
}