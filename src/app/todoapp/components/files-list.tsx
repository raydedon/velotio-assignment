import * as React from 'react';
import {connect} from 'react-redux';
import {IFile, IFilesList} from "../index";
import File from './file';

const FilesList: React.SFC<IFilesList> = ({list = []}) => {
	const renderListItems = () => {
		return list.map((file: IFile) => (<File key={file.id} name={file.name} id={file.id} />));
	}
	
	return <ul>{renderListItems()}</ul>;
}

const mapStateToProps = ({list}: IFilesList) => ({list});

export default connect(mapStateToProps, {})(FilesList);