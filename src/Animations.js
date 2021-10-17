const loadingContainerVariants = {
    hidden: {
        opacity: 0,
        x: 50,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.02,
            delayChildren: 0.02,
        }
    },
};

const loadingItemVariants = {
    hidden: {
        y: "100%",
        x: 0,
        opacity: 0,
        transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.6
        }
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.6
        }
    }
}

const opacityVariants = {
    hidden: {
        opacity: 0,
        transition: {
            ease: "easeOut",
            duration: 0.4,
        }
    },
    visible: {
        opacity: 1,
        transition: {
            ease: "easeIn",
            duration: 0.4,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: "easeOut",
            duration: 0.4,
        }
    }
};

export {loadingContainerVariants, loadingItemVariants, opacityVariants};