import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileModal from "../../ProfileModal/ProfileModal";
import "./SidebarBottom.scss";
import SidebarBottomItem from "./SidebarBottomItem/SidebarBottomItem";
import { selectAudiences } from "../../../state/audience/audience.selectors";
import { useSelector } from "react-redux";

const itemsVariants = {
    initial: {

    },
    rest: delay => ({
        transition: {
            staggerChildren: .5,
            delayChildren: 2 + delay,
            staggerDirection: 'reverse'
        }
    })
}


export default function SidebarBottom(props) {
    const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
    const audiences = useSelector(selectAudiences);

    return (<div className="SidebarBottom">
        <motion.div className="SidebarBottom-Items"
            variants={itemsVariants}
            initial="initial"
            animate="rest"
            custom={audiences.length}
        >
            <SidebarBottomItem onClick={() => setProfileModalIsOpen(true)} />
        </motion.div>

        <ProfileModal
            isOpen={profileModalIsOpen}
            onClickAway={() => setProfileModalIsOpen(false)} />
    </div>)
}