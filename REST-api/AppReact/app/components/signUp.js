import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class SignUp extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>Registration form</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Sign up:</h3>
						</div>
						<div className="panel-body">
							<div className="container">
								<section>				
									<div>
										<a className="hiddenanchor" id="toregister"></a>
										<a className="hiddenanchor" id="tologin"></a>
										<div id="wrapper" style = {cadre}>
											<div id="register" className="animate form">
												<form  action="mysuperscript.php" autoComplete="on"> 
													<p> 
														<label htmlFor="usernamesignup" className="uname" style = {label}>Your username:</label>
														<input id="usernamesignup" name="usernamesignup" required="required" type="text"/>
													</p>
													<p> 
														<label htmlFor="emailsignup" className="youmail"  style = {label}> Your email:</label>
														<input id="emailsignup" name="emailsignup" required="required" type="email"/> 
													</p>
													<p> 
														<label htmlFor="professionsignup" className="youprof" style = {label}>Your profession:</label>
														<input id="professionsignup" name="professionsignup" required="required" type="text"/>
													</p>
													<p> 
														<label htmlFor="passwordsignup" className="youpasswd" style = {label}>Your password:</label>
														<input id="passwordsignup" name="passwordsignup" required="required" type="password"/>
													</p>
													<p> 
														<label htmlFor="passwordsignup_confirm" className="youpasswd" style = {label}>Please confirm your password:</label>
														<input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password"/>
													</p>
													<p className="signin button"> 
														<input type="submit" value="Sign up"/> 
													</p>
													<div className="change_link">  
														<h4 style={h4}>Already a member ?</h4> 
														<h4 style={h4}><Link to ='/Login'>Login</Link></h4>
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
