import * as React from 'react';
import SearchFile from './components/file-search';
import FilesList from './components/files-list';

const FilesListApp: React.SFC<{}> = () => {
	return (
		<React.Fragment>
			<SearchFile />
			<FilesList />
		</React.Fragment>
	);
};

export default FilesListApp;
