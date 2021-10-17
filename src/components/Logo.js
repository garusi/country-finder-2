import React from 'react';
import './Logo.scss';

const Logo = ({ logoColor }) => {
    return (
        <div className="logo-wrapper">
            <i className="material-icons-round md-36" style={{ color: logoColor }}>travel_explore</i>
            <h2 style={{ color: logoColor }}>Country Finder</h2>
        </div>
    )
}

export default Logo;