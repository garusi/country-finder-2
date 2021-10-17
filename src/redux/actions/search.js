import * as type from '../types';

export function searchCountry (searchInput) {
    return {
        type: type.SEARCH_COUNTRY,
        payload: searchInput
    }
}

export function clearSearch () {
    return {
        type: type.CLEAR_SEARCH_RESULTS,
    }
}