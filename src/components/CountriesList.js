import React from 'react';
import './CountriesList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCountry } from '../redux/actions/country';
import { CountryDetails } from './CountryDetails';
import WelcomeAction from './Welcome';
import AlphabeticalSidebar from './AlphabeticalSidebar';
import Search from './Search';
import { motion, AnimatePresence } from 'framer-motion';
import { loadingContainerVariants, loadingItemVariants } from '../Animations';


const CountriesList = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries.countries);
    const searchInput = useSelector(state => state.search.searchInput);
    const selectedCountry = useSelector(state => state.country.selectedCountry);
    const loading = useSelector(state => state.countries.loading);
    const error = useSelector(state => state.countries.error);
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    // Check if country is first of a letter (Labels)
    function isFirstOfLetter(country, cn) {
        const nextCountry = countries[cn - 1]
        if (nextCountry && cn > 0 && cn < countries.length && nextCountry.name.charAt(0).toLowerCase() === country.charAt(0).toLowerCase()) {
            return null
        } else {
            return true
        }
    }

    return (
        <div className="countries-list-wrapper">
            {countries.length > 0 && <AlphabeticalSidebar alphabet={alphabet} />}

            <AnimatePresence>
                {countries.length === 0 &&
                    <WelcomeAction />
                }
                {countries.length > 0 &&
                <>
                    <motion.div key="paw-a" className="actions-wrapper after"
                        initial={{ width: "0px", opacity: 0, color: "#11deb3" }}
                        animate={{ width: "100%", opacity: 1, color: "#131313" }}
                        transition={{ type: "tween", ease: "easeIn", duration: 0.6 }}>
                        <Search />
                    </motion.div>
                    <div className="height-wrapper">
                        <motion.ul id="countryList" className={`countries-list${selectedCountry ? ' modOpen' : ''}`} variants={loadingContainerVariants} initial="hidden" animate="visible" exit="hidden">
                            {countries.length >= 0 && countries.filter((country) => {
                                if (searchInput.length === 0) {
                                    return country;
                                } else if (country.name.toLowerCase().includes(searchInput.toLowerCase())) {
                                    return country;
                                }
                                return null;
                            }).map((country, cn) => {
                                return (
                                    <motion.li
                                        id={`${isFirstOfLetter(country.name, cn) ? 'ref-' + country.name.charAt(0).toLowerCase() : ''}`}
                                        className={`cname${isFirstOfLetter(country.name, cn) ? ' FL FirstLetter-' + country.name.charAt(0).toLowerCase() : ''}`}
                                        style={{ height: 68 }}
                                        key={`${country.name}-${cn}`}
                                        data-content={country.name.charAt(0).toLowerCase()}
                                        variants={loadingItemVariants}
                                        onClick={() => dispatch(setCountry(country.name))}>
                                        <span >
                                            {country.name}
                                        </span>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </div>
                    </>
                }
            </AnimatePresence>
            <AnimatePresence>
                {selectedCountry && <CountryDetails />}
            </AnimatePresence>

            {error && !loading && <p id="err">{error}</p>}

            <div className="status-wrapper">
                {countries.length > 0 && searchInput.length === 0 && <p className="total">Total Countries: {countries.length}</p>}
                {loading && <p className="loading">Loading...</p>}
            </div>
        </div>
    )
}

export default CountriesList;