import React from 'react';
import {jumbotron, h2, h3, panelDefault3, panelHeader, button, panelFooter, separation, cadre, tab, buttonNav, affichageProfile, affichageInfo} from '../css/style';
import {Button, Nav, NavItem, Tab, Row,Col, Grid, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

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
													<NavItem eventKey="first" style={buttonNav}>
														Personnal informations
													</NavItem>
													<NavItem eventKey="second" style={buttonNav}>
														My simulations
													</NavItem>
													<NavItem eventKey="third" style={buttonNav}>
														Messages
													</NavItem>
												</Nav>
											</Col>
											<Col sm={9} md={9}>
												<Tab.Content animation style = {cadre}>
													
													<Tab.Pane eventKey="first">
															<Grid>
																<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
																	<label style={{paddingLeft:'40%'}}>Informations:</label>
																</Row>
																<Row className="show-grid">
																	<Col sm={12} md={12}>
																		<div style = {affichageInfo}>
																			<ul>
																				<li>Name</li>
																				<li>Surname</li>
																				<li>Email</li>
																				<li>Username</li>
																				<li>Password: ****</li>
																			</ul>
																		</div>
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
															<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
																<label style={{paddingLeft:'40%'}}>Simulation:</label>
															</Row>
															<Row className="show-grid"  style = {cadre}>
																<Col xs={12}>
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
																
																<Col xs={12} >	
																	<label style={{paddingLeft:'10%'}}>Results</label>
																	<div style = {affichageProfile}>
																		<ul>
																			<li>here</li>
																			<li>you</li>
																			<li>can see the results</li>
																			
																		</ul>
																	</div>
																</Col>
															</Row>

															<Row className="show-grid">
																<Col xs={12} md={12}>
																	<Button
																		bsStyle="primary" style = {button}
																	>
																		Export
																	</Button>														
																	<Button
																		bsStyle="primary" style = {button}
																	>
																		Display
																	</Button>														
																</Col>
															</Row>
														</Grid>
													</Tab.Pane>
													
													<Tab.Pane eventKey="third">
														<Grid>
															<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
																<label style={{paddingLeft:'40%'}}>Conversations:</label>
															</Row>
															<Row style = {{padding:10}}>
																<Button
																	bsStyle="primary" 
																> 
																	New message
																</Button>
															</Row>
															<Row className="show-grid">
																<Col sm={12} md={12}  style={{maxHeight:300, overflow:'auto'}}>
																	
																	<div style={cadre}>
																		<Row style={separation}>
																			<label style={{paddingLeft:'5%'}}>Barry:</label>
																			<div style = {affichageProfile}>
																				<ul>
																					<li>blabla</li>
																					<li>blaba</li>
																					<li>babal</li>
																				</ul>
																			</div>
																		</Row>
																		<Row style={separation}>
																			<label style={{paddingLeft:'5%', paddingTop:15}}>Jay:</label>
																			<div style = {affichageProfile}>
																				<ul>
																					<li>blabla</li>
																					<li>blaba</li>
																					<li>babal</li>
																				</ul>
																			</div>
																		</Row>
																		<Row style={separation}>
																			<label style={{paddingLeft:'5%', paddingTop:15}}>Wally:</label>
																			<div style = {affichageProfile}>
																				<ul>
																					<li>blabla</li>
																					<li>blaba</li>
																					<li>babal</li>
																				</ul>
																			</div>
																		</Row>
																	</div>
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
					</div>				
				</section>	
			</div>		
		);
	}
}
