import React from 'react';
import './Welcome.scss';
import { useDispatch } from 'react-redux';
import { getCountries } from '../redux/actions/countries';
import { motion } from 'framer-motion';


const WelcomeAction = () => {
    const dispatch = useDispatch();

    const headline = ["Welcome to", "Coutnry Finder"];
    const paragraphs = ["React app that displays details about countries", "using data from the Rest Countries API."];
    return (
        <motion.div className="welcome-wrapper"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "tween", ease: "easeIn", duration: 0.6 }}>
            {headline.map((hdl, nm) => {
                return <h2 key={`${hdl}-${nm}`}>{hdl}</h2>
            })}
            {paragraphs.map((par, prm) => {
                return <p key={`${par}-${prm}`}>{par}</p>
            })}
            <div key="paw-b" className="actions-wrapper before">
                <button onClick={() => dispatch(getCountries())}>Show Countries</button>
            </div>
        </motion.div>
    )
}

export default WelcomeAction;