import * as React from 'react';

interface IFileProps {
	readonly key?: string;
	readonly id?: string;
	readonly name?: string;
}

const File: React.SFC<IFileProps> = ({id = '', name = '', key = ''}) => <div className="">{name}</div>

export default File;
