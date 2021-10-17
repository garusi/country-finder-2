import React from 'react';
import './Header.scss';
import Logo from './Logo';

const Header = () => {
    return (
        <div className="header">
            <div className="header-inner-wrapper">
                <Logo logoColor={"#f8f8f8"}/>
            </div>
        </div>
    )
}



export default Header;