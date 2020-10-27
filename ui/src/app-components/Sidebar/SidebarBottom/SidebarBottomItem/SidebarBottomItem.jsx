import React from "react";
import { motion } from "framer-motion";
import "./SidebarBottomItem.scss";

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
            damping: 20,
        }
    }
}

export default function SidebarBottomItem({ ...props }) {

    return (<motion.div className="SidebarBottomItem"
        variants={itemVariants}
    >
        <i className="fa fa-user" {...props} />
    </motion.div>)
}