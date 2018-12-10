import {store} from "../../store/configureStore.thunk";
import {ROOT_URL} from '../../utility';
import {
	ActionTypeKeys,
	IFetchFilesFailureAction,
	IFetchFilesRequestAction,
	IFetchFilesSuccessAction,
	IFile,
	ISearchFilesTextChangeAction, IStoreState
} from "../index";

export const fetchFiles: (text: string) => (dispatch: any) => Promise<void> = (text = '') => {
	return (dispatch) => {
		dispatch(fetchFilesRequest());
		
		return fetch(`${ROOT_URL}/api/files/${text}`)
			.then(
				r => r.json(),
				error => dispatch(fetchFilesFailure()))
			.then(r => {
				const {searchFilesText = ''} = store.getState() as IStoreState;
				if(searchFilesText === text) {
					dispatch(fetchFilesSuccess(r));
				} else {
					dispatch(fetchFilesFailure());
				}
			});
	};
}

export const fetchFilesRequest: () => IFetchFilesRequestAction = () => ({
	type: ActionTypeKeys.FETCH_FILES_REQUEST
});

export const fetchFilesSuccess: (list: IFile[]) => IFetchFilesSuccessAction = (list) => {
	return {
		payload: {
			list
		},
		type: ActionTypeKeys.FETCH_FILES_SUCCESS
	};
};

export const fetchFilesFailure: () => IFetchFilesFailureAction = () => ({
	type: ActionTypeKeys.FETCH_FILES_FAILURE
});

export const onSearchFilesTextChange: (text: string) => ISearchFilesTextChangeAction = text => ({
	payload: {text},
	type: ActionTypeKeys.SEARCH_FILES_INPUT_TEXT_CHANGE
});
