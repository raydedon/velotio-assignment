import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import logo from '../images/logo.svg';
import './App.scss';
import FilesListApp from './todoapp/files-list-app';

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React &amp; Redux</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
				<FilesListApp />
			</div>
		);
	}
}

const Root = () => (
	<HashRouter>
		<App />
	</HashRouter>
);

export default Root;
