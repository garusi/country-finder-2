import React from 'react';
import './AlphabeticalSidebar.scss';
import { Link } from 'react-scroll';


const AlphabeticalSidebar = ({ alphabet }) => {
    return (
        <div className="alpha-sidebar">
            <ul>
                {alphabet.map((letter, ln) => {
                    return <li key={ln}><Link to={`ref-${letter}`} offset={-100} spy={true} smooth={true} containerId="countryList">{letter}</Link></li>
                })}
            </ul>
        </div>
    )
}


export default AlphabeticalSidebar;