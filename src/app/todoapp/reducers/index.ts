import {AnyAction, combineReducers} from 'redux';
import {IStoreState} from "../index";
import list from './files';
import searchFilesText from './search-file';

const rootReducer= combineReducers<IStoreState, AnyAction>({
	list,
	searchFilesText
});

export default rootReducer;