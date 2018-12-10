import {Action} from "redux";

export interface IFile {
	readonly id: string;
	readonly name: string;
}

export interface IFilesList {
	list: IFile[];
}

export interface ISearchFilesText {
	searchFilesText: string;
}

export interface IStoreState {
	list: IFile[] | undefined;
	searchFilesText: string | undefined;
}

export enum ActionTypeKeys {
	FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
	FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
	FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE',
	SEARCH_FILES_INPUT_TEXT_CHANGE = 'SEARCH_FILES_INPUT_TEXT_CHANGE'
}

export type IFetchFilesRequestAction = Action<ActionTypeKeys>

export interface IFetchFilesSuccessAction extends Action<ActionTypeKeys> {
	readonly payload: IFilesList;
}

export type IFetchFilesFailureAction = Action<ActionTypeKeys>

export type ISearchFilesTextChangeAction = Action<ActionTypeKeys>