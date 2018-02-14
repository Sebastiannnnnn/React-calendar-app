import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MatchCalendar from './components/MatchCalendar';

const Root = ({ store }) => (
	<Router>
		<Route render={({ location }) => (
			<Switch location={location}>
				<Route exact path="/calendar/:month/:year" component={MatchCalendar} />
				<Route exact path="/*" component={MatchCalendar} />
				<Route render={() => <div>Not Found</div>} />
			</Switch>
		)}/>
	</Router>
)

export default Root