import React from 'react';
import './CountryDetails.scss';
import { useSelector, useDispatch } from 'react-redux';
import { opacityVariants } from '../Animations';
import { clearCountry } from '../redux/actions/country';
import { motion } from 'framer-motion';
import Logo from './Logo';


export const CountryDetails = () => {
    const dispatch = useDispatch();
    const country = useSelector(state => state.country.countryDetails[0]);

    const closeHandleClick = (e) => {
        // overlaybox click outside to Exit
        if (e.target.classList.contains('overlaybox') && !e.target.classList.contains('country-details-wrapper')) {
            dispatch(clearCountry());
        }
    }

    const buttonHandleClick = () => {
        dispatch(clearCountry());
    }

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Country Details
    const countryInfo = [
        {
            "label": "Capital City",
            "value": country && country.capital ? country.capital : '-',
            "icon": "home_work",
        }, {
            "label": "Population",
            "value": country && country.population ? numberWithCommas(country.population) : '-',
            "icon": "groups",
        }, {
            "label": "Alpha2Code",
            "value": country && country.alpha2Code ? country.alpha2Code : '-',
            "icon": "tag",
        },
        // Extra Details
        {
            "label": "Region",
            "value": country && country.region ? country.region : '-',
            "icon": "public",
        },
        {
            "label": "Calling Codes",
            "value": country && country.callingCodes ? `+${country.callingCodes}` : '-',
            "icon": "smartphone",
        },
        {
            "label": "Domain",
            "value": country && country.topLevelDomain[0] ? country.topLevelDomain[0]  : '-',
            "icon": "domain_verification",
        }
    ]

    return (
        <motion.div className="overlaybox" onClick={closeHandleClick}
            initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="country-details-wrapper">
            <span className="back-btn" type="button" alt="Back" onClick={buttonHandleClick}>
                    <i className="material-icons-round md-36">arrow_back</i>
                </span>
                {country ?
                    <>
                        <motion.div className="flag" variants={opacityVariants} initial="hidden" animate="visible" exit="exit"
                            style={{ background: "url(" + country.flag + ") 50% 50% / cover no-repeat" }}>
                                        {!country.flag && <i className="material-icons-round md-32">image</i>}
                        </motion.div>
                        <motion.h2 variants={opacityVariants} initial="hidden" animate="visible" exit="exit">{country.name}</motion.h2>
                        <div className="info-wrapper">
                            {countryInfo && countryInfo.map((countryInfo, num) => {
                                return <motion.div key={`${num}-${countryInfo.label}`} className="info" variants={opacityVariants} initial="hidden" animate="visible" exit="exit">
                                    <div className="info-category">
                                        <i className="material-icons-round md-32">{countryInfo.icon}</i>
                                        <label>{countryInfo.label}</label>
                                    </div>
                                    <p className="info-value">{countryInfo.value}</p>
                                </motion.div>
                            })}
                        </div>
                    </>
                    :
                    <Logo logoColor={"#11deb3"} />
                }


            </div>


        </motion.div>
    )
}
