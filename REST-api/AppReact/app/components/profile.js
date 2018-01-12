import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export class Profile extends React.Component{
	render(){

		return (
		
			
			<div>
				<h2 className = "text-center" style = {h2}>That's you right</h2>
				<section className="jumbotron" style = {jumbotron}>
				<div className="panel panel-default" style = {panelDefault3}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Account:</h3>
						</div>
						<div className="panel-body">
							<div className="container">							 
								<section>
									<Tab.Container id="left-tabs-example" defaultActiveKey="first">
										<Row className="clearfix">
											<Col sm={3} md= {3}>
												<Nav bsStyle="pills" stacked style = {tab}>
													<NavItem eventKey="first" >
														Personnal informations
													</NavItem>
													<NavItem eventKey="second">
														My simulations
													</NavItem>
													<NavItem eventKey="third">
														Messagerie
													</NavItem>
												</Nav>
											</Col>
											<Col sm={9} md={9}>
												<Tab.Content animation style = {cadre}>
													
													<Tab.Pane eventKey="first">
															<Grid>
																<Row className="show-grid"  style = {cadre}>
																	<Col sm={12} md={12}>
																		<form>
																			<FormGroup>
																				<ControlLabel>My informations</ControlLabel>
																				<FormControl.Static>
																					<li>name:</li>
																					<li>email:</li>
																					<li>address</li>
																				</FormControl.Static>
																			</FormGroup>
																		</form>
																	</Col>
																</Row>
																	
																<Row className="show-grid">
																	<Col sm={12} md={12}>
																		<Button
																			bsStyle="primary" style = {button}
																			/*onClick={() => this.setState({ show: true})}*/
																		>Modify
																		</Button>
																	</Col>
																</Row>
															</Grid>
																												
													</Tab.Pane>

													<Tab.Pane eventKey="second">
														<Grid>
															<Row className="show-grid"  style = {cadre}>
																<Col xs={6} md={6}>
																	<form>
																		<FormGroup controlId="formControlsSelect">
																		  <ControlLabel>Select your result</ControlLabel>
																		  <FormControl componentClass="select" placeholder="select">
																			<option value="select">select</option>
																			<option value="other">...</option>
																		  </FormControl>
																		</FormGroup>
																	</form>
																</Col>
																
																<Col xs={6} md={6}>
																	<form>
																		<FormGroup>
																			<ControlLabel>Result's information</ControlLabel>
																			<FormControl.Static style = {cadre}>
																				<li>elem1</li>
																				<li>elem2</li>
																				<li>elem3</li>
																			</FormControl.Static>
																		</FormGroup>
																	</form>
																</Col>
															</Row>

															<Row className="show-grid">
																<Col xs={12} md={12}>
																	<Button
																		bsStyle="primary" style = {button}
																		/*onClick={() => this.setState({ show: true})}*/
																	>Export
																	</Button>														
																	<Button
																		bsStyle="primary" style = {button}
																		/*onClick={() => this.setState({ show: true})}*/
																	>Visualize
																	</Button>														
																</Col>
															</Row>
														</Grid>
													</Tab.Pane>
													
													<Tab.Pane eventKey="third">
														<Grid>
															<Row className="show-grid" style = {cadre}>
																<Col sm={12} md={12}>
																	<form>
																		<FormGroup>
																			<ControlLabel>My messages</ControlLabel>
																			<FormControl.Static>
																				<li>bla</li>
																				<li>bla</li>
																				<li>blo</li>
																			</FormControl.Static>
																		</FormGroup>
																	</form>
																</Col>
															</Row>
															<Row className="show-grid">
																<Col sm={12} md={12}>
																	<Button
																		bsStyle="primary" style = {button}
																		/*onClick={() => this.setState({ show: true})}*/
																	>Visualize
																	</Button>
																</Col>
															</Row>
														</Grid>
													</Tab.Pane>													
												</Tab.Content>
										  </Col>
										</Row>
									</Tab.Container>
								</section>
							</div>
						</div>
						<div className="panel-footer" style = {panelFooter}>
							<Button
								bsStyle="primary" style = {button}
								/*onClick={() => this.setState({ show: true})}*/
							>Log out!
							</Button>
						</div>
					</div>				
				</section>	
			</div>		
		);
	}
}
