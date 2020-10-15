import React from "react";
import { useSelector } from "react-redux";
import { selectAudiences } from "../../state/audience/audience.selectors";
import { motion } from "framer-motion";
import AudienceListItem from "../AudienceListItem/AudienceListItem";
import "./AudienceList.scss";

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
            />)
        }
    </motion.div>)
}