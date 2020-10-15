import React from "react";
import { motion } from "framer-motion";
import "./AudienceListItem.scss";

const itemVariants = {
    initial: {
        x: "100%"
    },
    rest: {
        x: 0,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 13
        }
    }
}

export default function AudienceListItem({ name, avatarUrl }) {
    return (<motion.div className="AudienceListItem"
        variants={itemVariants}
    >
        <img className="AudienceListItem-Avatar" src={avatarUrl} />
        <span className="AudienceListItem-Title">{name}</span>
    </motion.div>);
}