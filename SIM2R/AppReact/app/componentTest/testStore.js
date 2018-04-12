import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {footStyle, jumbotron, jumbotronBis, h1, panelHeader, navBar, panelFooter, link, dropColor, cadre} from 'D:/frederic/Documents/cours/code/AppReact/app/css/style';
import {MenuItem, Nav, NavItem, Navbar, NavDropdown} from 'react-bootstrap';

import Page from './page.js';
import Page1 from './page1.js';
import Page2 from './page2.js';
import {Page3} from './page3.js';
import StoreV from './storeV';

import { Provider } from 'react-redux'

const TestStore = ({ store }) => (
	<Provider store = {store}>
		<Router>
			<div>
				<Head/>
				<MyNav/>
				<StoreV/>
				<Switch>
					<Route exact path="/" render={() => <Page/>}/>
					<Route path="/Page1" render={() => <Page1/>}/>
					<Route path="/Page2" render={() => <Page2/>} />
					<Route path="/Page3" render={() => <Page3/>} />
				</Switch>
				
				<Footer/>
			</div>
		</Router>	
	</Provider>
)

const Head = () => (
	<div>
		<title>Transport Simulation</title>
		<meta charSet="utf-8"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
	</div>
)

class MyNav extends React.Component{
	render(){
		return (
			<main>	
				<h1 className = "text-center" style ={h1}>Mon site de test</h1>
				<Navbar inverse collapseOnSelect style ={navBar}>
				    <Navbar.Header>
						<Navbar.Brand>
							Navigation Bar:
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem eventKey={1}><Link to='/' style= {link}>fetch avancé</Link></NavItem>
							<NavItem eventKey={2}><Link to='/Page1' style= {link}>fetch basique</Link></NavItem>
							<NavItem eventKey={3}><Link to='/Page2' style= {link}>add redux</Link></NavItem>
							<NavItem eventKey={3}><Link to='/Page3' style= {link}>scenarios</Link></NavItem>
						</Nav>

					</Navbar.Collapse>
				</Navbar>
			</main>
		);
	}
}

const Footer = () => (
	<footer>
		<div className="footer navbar-fixed-bottom" style={footStyle}>
			<p>
				<i className="icon-user"></i> Admin
				| <i className="icon-calendar"></i> Jan 23th, 2017 at 2:20 pm
			</p>
		</div>
	</footer>
)

export default TestStore;
