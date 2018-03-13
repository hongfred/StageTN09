import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {footStyle, jumbotron, jumbotronBis, h1, panelHeader, navBar, panelFooter, link, dropColor} from '../css/style';
import {MenuItem, Nav, NavItem, Navbar, NavDropdown} from 'react-bootstrap';

import {Home} from './home';
import {Simulation} from './simulation/simulation';
import {About} from './about';
import {Profile} from './profile';
import SignUp from './signUp';
import Login from './login';
import {Help} from './help';

import StoreV from '../componentTest/storeV';

import { Provider } from 'react-redux'

const App = ({ store }) => (
	<Provider store = {store}>
		<Router>
			<div>
				<Head/>
				<MyNav/>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path="/Simulation" render={() => <Simulation store ={store} />} />
					<Route path="/About" render={() => <About store ={store} />} />
					<Route path='/SignUp' component={SignUp}/>
					<Route path='/Profile' component={Profile}/>
					<Route path='/Login' component={Login}/>
					<Route path='/Help' component={Help}/>
				</Switch>
				<StoreV/>
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
				<h1 className = "text-center" style ={h1}>Sim2r</h1>
				<Navbar inverse collapseOnSelect style ={navBar}>
				    <Navbar.Header>
						<Navbar.Brand>
							Navigation Bar:
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem eventKey={1}><Link to='/' style= {link}><span className="glyphicon glyphicon-home"></span> Home</Link></NavItem>
							<NavItem eventKey={2}><Link to='/Simulation' style= {link}><span className="glyphicon glyphicon-road"></span> Simulation</Link></NavItem>
							<NavItem eventKey={3}><Link to='/About' style= {link}><span className="glyphicon glyphicon-list-alt"></span> About us</Link></NavItem>
						</Nav>
						<Nav pullRight>
							<NavItem eventKey={4}><Link to ='/SignUp' style= {link}><span className="glyphicon glyphicon-pencil"></span> Sign Up</Link></NavItem>
							<NavDropdown eventKey={5} title="Account" id="nav-dropdown">
								<MenuItem eventKey={5.1}><Link to ='/Profile' style = {dropColor}><span className="glyphicon glyphicon-user"></span> Profile</Link></MenuItem>
								<MenuItem divider />
								<MenuItem eventKey={5.2}><Link to ='/Login' style = {dropColor}>Log in</Link></MenuItem>
								<MenuItem eventKey={5.3}>Log out</MenuItem>
							</NavDropdown>
							
							<NavItem eventKey={6}><Link to ='/Help' style= {link}><span className="glyphicon glyphicon-question-sign"></span> Help</Link>
							</NavItem>
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
				<i className="icon-calendar"></i> Jan 23th, 2017 at 2:20 pm
			</p>
		</div>
	</footer>
)

export default App;