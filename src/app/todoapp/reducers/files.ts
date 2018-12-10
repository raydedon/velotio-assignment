import {AnyAction} from "redux";
import {ActionTypeKeys, IFile, IFilesList} from "../index";

const list: (state: IFile[], action: AnyAction) => IFile[] = (state = [], action) => {
	const {type, payload} = action;
	switch(type) {
		case ActionTypeKeys.FETCH_FILES_SUCCESS:
			return (payload as IFilesList).list;
		default:
			return state;
	}
};

export default list;