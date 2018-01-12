import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>Enter your informations</h2>
				<section className="jumbotron" style = {jumbotron}>
					
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Account:</h3>
						</div>
						<div className="panel-body">
							<div className="container">							 
								<section>				
									<div>
										<a className="hiddenanchor" id="toregister"></a>
										<a className="hiddenanchor" id="tologin"></a>
										<div id="wrapper" style = {cadre}>
											<div id="login" className="animate form">
												<form  action="mysuperscript.php" autoComplete="on"> 
													<p> 
														<label htmlFor="username" className="uname" style = {label}> Your email or username: </label>
														<input id="username" name="username" required="required" type="text"/>
													</p>
													<p> 
														<label htmlFor="password" className="youpasswd" style = {label}> Your password: </label>
														<input id="password" name="password" required="required" type="password"/> 
													</p>
													<p className="login button"> 
														<input type="submit" value="log in"/> 
													</p>
													<div className="change_link">
														<h4 style={h4}>Not a member yet ?</h4>
														<h4 style={h4}><Link to ='/SignUp'>Sign Up</Link></h4>
													</div>
												</form>
											</div>
										</div>
									</div>  
								</section>
							</div>
						</div>
					</div>
				</section>
			</div>		
		);
	}
}
