import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sandbox from './devComponents/Sandbox';
import AdminPanel from './components/Admin/AdminPanel';
import StoreModule from './components/Store/StoreModule';

import styles from './styles/index.scss';

class App extends Component {
	render () {
		return (
			<Router>
				<div className={styles.generalStyles}>
					<Switch>
						<Route path="/sandbox" component={Sandbox} />
						<Route path="/adminpanel" component={AdminPanel} />
						<Route path="/" component={StoreModule} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
