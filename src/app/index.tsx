import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../stylesheets/style.scss';
import Root from './App';
import {store} from './store/configureStore.thunk';
import {fetchFiles} from "./todoapp/actions";

store.dispatch(fetchFiles(''));

ReactDOM.render(
	<Provider store={store}>
		<Root/>
	</Provider>,
	document.getElementById('root'));
