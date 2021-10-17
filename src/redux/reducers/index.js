import { combineReducers } from 'redux';
import countries from './countries';
import country from './country';
import search from './search';


const rootReducer = combineReducers({
    countries,
    country,
    search
});


export default rootReducer;