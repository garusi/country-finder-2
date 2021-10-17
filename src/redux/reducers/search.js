import * as type from '../types';


const initialState = {
    searchInput:'',
    searchSuggestions:[],
}

export default function search(state = initialState, action) {
    switch (action.type) {
        case type.SEARCH_COUNTRY:
            return {
                ...state,
                searchInput: action.payload,
            }
            case type.SET_SEARCH_SUGGESTIONS:
            return {
                ...state,
                searchSuggestions: action.searchSuggestions,
            }
            case type.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchInput:'',
                searchSuggestions: [],
            }
        default:
            return state;
    }
}