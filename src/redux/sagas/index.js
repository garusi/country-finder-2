import { all } from 'redux-saga/effects';
import countriesSaga from './countries';
import countrySaga from './country';
// import searchSaga from './search';


export default function* rootSaga() {
    yield all([
        countriesSaga(),
        countrySaga(),
        // searchSaga(),

    ])
}