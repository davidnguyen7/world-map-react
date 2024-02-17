import { motion } from "framer-motion";
import React from "react";

export const LoadingOverlay = () => {
    return <motion.div 
        initial={{opacity: 1}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="loading-overlay" 
    />
}