import {AnyAction} from "redux";
import {ActionTypeKeys} from "../index";

const searchFilesText: (state: string, action: AnyAction) => string = (state = '', action) => {
	const {type, payload = {}} = action;
	switch(type) {
		case ActionTypeKeys.SEARCH_FILES_INPUT_TEXT_CHANGE:
			const {text = ''} = payload;
			return text;
		default:
			return state;
	}
};

export default searchFilesText;