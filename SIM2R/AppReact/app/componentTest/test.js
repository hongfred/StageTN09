import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { footStyle, jumbotron, jumbotronBis, h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody } from '../css/style';
import { DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row, Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { createStore } from 'redux';

import { Home } from './home';
import { Simulation } from './simulation';
import { About } from './about';
import { Profile } from './profile';
import { SignUp } from './signUp';
import { Login } from './login';
import { Help } from './help';

class Test extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = {
            users: [{
                id: 1,
                username: "hehehe"
            },{
                id: 2,
                username: "hahaha"
            }]
        };
		this.fetchData = this.fetchData.bind(this)
		
    }
    /*componentDidMount() {
		fetch("http://localhost:1337/users",{
			method: 'POST',
			header: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify[{
				email:'foo',
				user: 'bar'
			}]
		})
            .then(res => {
                alert(JSON.stringify(res));
                return res;
            })
            .then(users => {
               //alert(users);
                //this.setState({ users: users })
            })
			.catch(function(error) {
				alert(error);
			});

    }*/
	setStateAsync(state) {
		return new Promise((resolve) => {
		  this.setState(state, resolve)
		});
	}
	
	componentDidMount() {	
		//this.fetchData()
	}
	async fetchData(){
		try{
		  const res = await fetch('http://localhost:1337/users')
		  const users = await res.json()
		  alert(JSON.stringify(users));
		   this.setStateAsync({users: users})
		}
		catch(err){
			alert(err);
			res.status(500);
		}
	}

    render(){
		let lol = this.state.users;
        return (
			
            <div className="test">
                <h1>Users</h1>
				<Button
					bsStyle="primary"
					onClick={this.fetchData}
				>
					fetch
				</Button>
                {this.state.users.map(user =>
                    <div key={user.id}>
						{user.username}
					</div>
                )}
				<p>{lol[1].username}</p>
            </div>
        );
    }
}

class Head extends React.Component {
    render() {
        return (
            <div>
                <title>Transport Simulation</title>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <main>
                <h1 className="text-center" style={h1}>Sim2r</h1>
                <Navbar inverse collapseOnSelect style={navBar}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Navigation Bar:
						</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1}><Link to='/' style={link}>Home</Link></NavItem>
                            <NavItem eventKey={2}><Link to='/Simulation' style={link}>Simulation</Link></NavItem>
                            <NavItem eventKey={3}><Link to='/About' style={link}>About us</Link></NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={4}><Link to='/SignUp' style={link}><span className="glyphicon glyphicon-pencil"></span> Sign Up</Link></NavItem>
                            <NavDropdown eventKey={5} title="Account" id="basic-nav-dropdown" >
                                <MenuItem eventKey={5.1}><Link to='/Profile' style={dropColor}><span className="glyphicon glyphicon-user"></span> Profile</Link></MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={5.2}><Link to='/Login' style={dropColor}>Log in</Link></MenuItem>
                                <MenuItem eventKey={5.3}>Log out</MenuItem>
                            </NavDropdown>

                            <NavItem eventKey={6}><Link to='/Help' style={link}><span className="glyphicon glyphicon-question-sign"></span> Help</Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Router />

            </main>
        );
    }
}

class Router extends React.Component {
    render() {
        return (

            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/Simulation' component={Simulation} />
                    <Route path='/About' component={About} />
                    <Route path='/SignUp' component={SignUp} />
                    <Route path='/Profile' component={Profile} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Help' component={Help} />
                </Switch>
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footer navbar-fixed-bottom" style={footStyle}>
                    <p>
                        <i className="icon-user"></i> Admin
							| <i className="icon-calendar"></i> Nov 23th, 2017 at 2:20 pm
						</p>
                </div>
            </footer>
        );
    }
}




export default Test;