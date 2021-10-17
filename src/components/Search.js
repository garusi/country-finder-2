import React from 'react';
import './Search.scss';
import { useSelector, useDispatch } from 'react-redux';
import { searchCountry, clearSearch } from '../redux/actions/search';


const Search = () => {
    const dispatch = useDispatch();
    // const suggestedCountries = useSelector(state => state.search.searchSuggestions);
    const searchInput = useSelector(state => state.search.searchInput);

    const searchChangeHandler = (e) => {
        dispatch(searchCountry(e.target.value))
    }

    const clearSearchHandler = () => {
        dispatch(clearSearch())
    }

    return (
        <div className="search-wrapper">
            {searchInput.length > 0 && <span className="clear" onClick={clearSearchHandler}>Clear</span>}
            <input className="search-input" type="text" name="search" placeholder="Search Country" onChange={searchChangeHandler} value={searchInput}/>
            {/* {suggestedCountries.length > 0 &&
                <ul style={{ listStyle: 'none' }} className="search-suggestions-wrapper">
                    {suggestedCountries.map((scountry, cn) => {
                        if (cn <= 4) {
                            return <li className="search-suggestion" key={cn}>{scountry}</li>
                        }
                        return null
                    })}
                </ul>} */}
        </div>
    )
}

export default Search;

