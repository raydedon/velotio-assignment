import throttle from "lodash/throttle";
import * as React from "react";
import {connect} from 'react-redux';
import {fetchFiles, onSearchFilesTextChange} from '../actions/index';
import {IStoreState} from "../index";

interface ISearchFilesProps {
	searchFilesText: string;
	onSearchFilesTextChange: (text: string) => void;
	fetchFiles: (text: string) => void;
}
class SearchFile extends React.Component<ISearchFilesProps, {}> {
	public fetchFilesThrottled: any;
	
	constructor(props: ISearchFilesProps) {
		super(props);
		const {fetchFiles: fetchFilesFn} = this.props;
		this.fetchFilesThrottled = throttle(fetchFilesFn, 500);
		this.onSearchFilesTextChangeFn = this.onSearchFilesTextChangeFn.bind(this);
	}
	
	public onSearchFilesTextChangeFn(event: React.ChangeEvent<HTMLInputElement>): void {
		const {onSearchFilesTextChange: onSearchFilesTextChangeHandler} = this.props;
		const value = event.target.value;
		onSearchFilesTextChangeHandler(value);
		this.fetchFilesThrottled(value);
	}
	
	public render() {
		const {searchFilesText = ''} = this.props;
		return (
			<form>
				<div className="input-group mb-3">
					<input type="text"
					       className="form-control"
					       placeholder="File name..."
					       onChange={this.onSearchFilesTextChangeFn}
					       value={searchFilesText} />
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state: IStoreState) => ({
	searchFilesText: state.searchFilesText
});

const mapDispatchToProps = (dispatch: any) => ({
	fetchFiles: (text: string) => dispatch(fetchFiles(text)),
	onSearchFilesTextChange: (text: string) => dispatch(onSearchFilesTextChange(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFile);

