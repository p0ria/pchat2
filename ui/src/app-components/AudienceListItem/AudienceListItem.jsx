import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./AudienceListItem.scss";

const itemVariants = {
    initial: {
        x: "100%"
    },
    rest: {
        x: 0,
        y: 0,
        transition: {
            duration: .5,
            delay: .5,
            type: "spring"
        }
    }
}

export default function AudienceListItem({ name, avatarUrl }) {
    return (<motion.div className="AudienceListItem"
        variants={itemVariants}
        initial="initial"
        animate="rest"
    >
        <img className="AudienceListItem-Avatar" src={avatarUrl} />
        <span className="AudienceListItem-Title">{name}</span>
    </motion.div>);
}