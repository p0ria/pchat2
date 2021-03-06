import React from "react";
import { motion } from "framer-motion";
import "./AudienceListItem.scss";

const itemVariants = {
    initial: {
        scale: 2,
        opacity: 0
    },
    rest: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
}

export default function AudienceListItem({ name, avatarUrl, active, ...props }) {
    return (
        <motion.div className={`AudienceListItem ${active ? 'active' : ''}`}
            variants={itemVariants}
            {...props}
        >
            <img className="AudienceListItem-Avatar" src={avatarUrl} />
            <span className="AudienceListItem-Title">{name}</span>
        </motion.div>);
}