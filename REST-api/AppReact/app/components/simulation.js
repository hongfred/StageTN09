import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Chart } from './chart';


function FieldGroup({ id, label, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

function ItemLister(props) {
	return( 
		<div style = {cadre}>
			<h4> 
				<p>Mes résultats: </p>
				{props.result}
			</h4>
		</div>
	)
}
var lol= [[3,4],[5,6]];
export class Simulation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			result: [lol],
			show: false,
			show2: false
		};
		this.fetchData = this.fetchData.bind(this)
    }
	
	setStateAsync(state) {
		return new Promise((resolve) => {
		  this.setState(state, resolve)
		});
	}	
	async fetchData(){
		try{
			const res = await fetch('http://localhost:1337/testSimu')
			alert (res)
			let result = await res.json()
			alert (result)
			result = JSON.parse(result)
			//alert(result);
			await this.setStateAsync({result: result})
		}
		catch(err){
			alert(err);
			res.status(500);
		}
	}
	
	render(){
        const close = () => this.setState({ show: false });
        const close2 = () => this.setState({ show2: false });
		return (
            <div>
				<h2 className = "text-center" style = {h2}>Make your simulation</h2>
				<section className="jumbotron" style = {jumbotronBis}>	
					<div className="panel panel-default" style = {panelDefault2}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Set your parameters:</h3>
						</div>
						<div className="panel-body">
							<div className="modal-body row">
								<Grid>
									<Row className="show-grid">
										<Col xs={8} md={8}>
											<Row className="show-grid">
												<Col xs={6} md={6}>
                                                    <Panel header="Set your database" bsStyle="primary">
														<form>
															<FieldGroup
															  id="formControlsFile"
															  type="file"
															  label="File"
															/>
															<FormGroup controlId="formControlsSelect">
															  <ControlLabel style = {label}>Select</ControlLabel>
															  <FormControl componentClass="select" placeholder="select">
																<option value="select">select</option>
																<option value="other">...</option>
															  </FormControl>
															</FormGroup>
														</form>
														
														<div className="modal-container">
															<Button
																bsStyle="primary"
																onClick={() => this.setState({ show: true})}
															>
																Parameters
															</Button>

															<Modal
																show={this.state.show}
																onHide={close}
																container={this}
																aria-labelledby="contained-modal-title"
															>
																<Modal.Header closeButton>
																	<Modal.Title id="contained-modal-title" style = {h3Bis}>Choose wisely</Modal.Title>
																</Modal.Header>
																<Modal.Body>
																	<form>
																		<FieldGroup
																		  id="formControlsFile"
																		  type="file"
																		  label="Parameter 1"
																		/>
																		<FormGroup controlId="formControlsSelect">
																		  <ControlLabel>Select</ControlLabel>
																		  <FormControl componentClass="select" placeholder="select">
																			<option value="select">hour</option>
																			<option value="other">...</option>
																		  </FormControl>
																		</FormGroup>
																	</form>
																</Modal.Body>
															</Modal>
														</div>
														
														<Button type="submit" style={buttonSimu}>
														  Save
														</Button>	
													</Panel>
												</Col>
												
												<Col xs={6} md={6}>
												    <Panel header="Contents" bsStyle="primary">
														<form>
															<FormGroup>
																<ControlLabel style = {label}>My database and parameters:</ControlLabel>
																<FormControl.Static style = {cadre}>
																	<li>elem1</li>
																	<li>elem2</li>
																	<li>elem3</li>
																</FormControl.Static>
															</FormGroup>
														</form>
													</Panel>				
												</Col>
											</Row>
											<Row className="show-grid">
												<Panel header="Set the options" bsStyle="primary">
													<Tabs defaultActiveKey={1} id='tabs' style = {tabSimu}>
														<Tab eventKey={1} title="option1">
															<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
																<Row className="clearfix">
																	<Col sm={4}>
																		<Nav bsStyle="pills" stacked style = {navSimu}>
																			<NavItem eventKey="first" >
																				element 1
																			</NavItem>
																			<NavItem eventKey="second">
																				element 2
																			</NavItem>
																		</Nav>
																	</Col>
																	
																	<Col sm={8}>
																		<Tab.Content animation>
																			<Tab.Pane eventKey="first" style = {cadre}>
																				<Grid>
																					<Row className="show-grid" >
																						<Col md={6} mdPush={6}>
																							<form>
																								<FormGroup controlId="formControlsTextarea">
																								  <ControlLabel>Date</ControlLabel>
																								  <FormControl componentClass="textarea" placeholder="hour" />
																								</FormGroup>
																							</form>
																						</Col>
																						<Col md={6} mdPull={6}>
																							<form>
																								<FormGroup controlId="formControlsSelect">
																								  <ControlLabel>Select</ControlLabel>
																								  <FormControl componentClass="select" placeholder="select">
																									<option value="select">select</option>
																									<option value="other">...</option>
																								  </FormControl>
																								</FormGroup>
																							</form>
																						</Col>
																					</Row>
																					<Row className="show-grid">
																						<Button type="submit" style = {button}>
																							Submit
																						</Button>
																					</Row>
																				</Grid>

																			</Tab.Pane>
																			<Tab.Pane eventKey="second" style = {cadre}>
																				<Grid>
																					<Row className="show-grid" >
																						<Col md={6} mdPush={6}>
																							<form>
																								<FormGroup controlId="formControlsTextarea">
																								  <ControlLabel>Date</ControlLabel>
																								  <FormControl componentClass="textarea" placeholder="hour" />
																								</FormGroup>
																							</form>
																						</Col>
																						<Col md={6} mdPull={6}>
																							<form>
																								<FormGroup controlId="formControlsSelect">
																								  <ControlLabel>Select</ControlLabel>
																								  <FormControl componentClass="select" placeholder="select">
																									<option value="select">select</option>
																									<option value="other">...</option>
																								  </FormControl>
																								</FormGroup>
																							</form>
																						</Col>
																					</Row>
																					<Row className="show-grid">
																						<Button type="submit" style = {button}>
																							Submit
																						</Button>
																					</Row>
																				</Grid>
																			</Tab.Pane>
																		</Tab.Content>
																	</Col>
																</Row>
															</Tab.Container>
														</Tab>
														
														<Tab eventKey={2} title="option2">
															<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
																<Row className="clearfix">
																	<Col sm={4}>
																		<Nav bsStyle="pills" stacked style = {navSimu}>
																			<NavItem eventKey="first">
																				element 1
																			</NavItem>
																			<NavItem eventKey="second">
																				element 2
																			</NavItem>
																		</Nav>
																	</Col>
																	
																	<Col sm={8}>
																		<Tab.Content animation>
																			<Tab.Pane eventKey="first" style = {cadre}>
																				<Grid>
																					<Row className="show-grid" >
																						<Col md={6} mdPush={6}>
																							<form>
																								<FormGroup controlId="formControlsTextarea">
																								  <ControlLabel>Date</ControlLabel>
																								  <FormControl componentClass="textarea" placeholder="hour" />
																								</FormGroup>
																							</form>
																						</Col>
																						<Col md={6} mdPull={6}>
																							<form>
																								<FormGroup controlId="formControlsSelect">
																								  <ControlLabel>Select</ControlLabel>
																								  <FormControl componentClass="select" placeholder="select">
																									<option value="select">select</option>
																									<option value="other">...</option>
																								  </FormControl>
																								</FormGroup>
																							</form>
																						</Col>
																					</Row>
																					<Row className="show-grid">
																						<Button type="submit" style = {button} >
																							Submit
																						</Button>
																					</Row>
																				</Grid>	
																			</Tab.Pane>
																			<Tab.Pane eventKey="second" style = {cadre}>
																				<Grid >
																					<Row className="show-grid" >
																						<Col md={6} mdPush={6}>
																							<form>
																								<FormGroup controlId="formControlsTextarea">
																								  <ControlLabel>Date</ControlLabel>
																								  <FormControl componentClass="textarea" placeholder="hour" />
																								</FormGroup>
																							</form>
																						</Col>
																						<Col md={6} mdPull={6}>
																							<form>
																								<FormGroup controlId="formControlsSelect">
																								  <ControlLabel>Select</ControlLabel>
																								  <FormControl componentClass="select" placeholder="select">
																									<option value="select">select</option>
																									<option value="other">...</option>
																								  </FormControl>
																								</FormGroup>
																							</form>
																						</Col>
																					</Row>
																					<Row className="show-grid">
																						<Button type="submit" style = {button}>
																							Submit
																						</Button>
																					</Row>
																				</Grid>	
																			</Tab.Pane>
																		</Tab.Content>
																	</Col>
																</Row>
															</Tab.Container>
														</Tab>
													</Tabs>											
												</Panel>
											</Row>									
										</Col>
										<Col xs={4} md={4}>
											<Panel header="Scenarios" bsStyle="primary">
												<label style = {label}>Do not interupt the simulation!</label>
												<Tabs defaultActiveKey={1} id='tabs' style ={tabSimu}>
													<Tab eventKey={1} title="Without">
													<div style = {cadre}>
														<ButtonGroup vertical>
															<label style= {label}>Start</label>	
															<Button
																bsStyle="primary"
																onClick={this.fetchData}
															>
																Simulation
															</Button>
															<ItemLister result={this.state.result}/>
															<Button
																bsStyle="secondary"
																onClick={() => this.setState({ show2: true })}
															>
																Show results
															</Button>
															<Modal
																show={this.state.show2}
																onHide={close2}
																container={this}
																aria-labelledby="contained-modal-title"
																bsSize="large"
															>
																<Modal.Header closeButton>
																	<Modal.Title id="contained-modal-title" style={h3Bis}>Here is the result of your simulation</Modal.Title>
																</Modal.Header>
																<Modal.Body style={{ height: 550 }}>
																	<form>
																		<div id='chart-container'>
																			<Chart result={this.state.result}/>
																		</div>
																	</form>
																</Modal.Body>
															</Modal>
															<Button type="submit" style = {buttonSimu}>
																Show the sensibility
															</Button>				
														</ButtonGroup>
													</div>
													</Tab>
													<Tab eventKey={2} title="With">
														<form style = {cadre}>
														    <FormGroup controlId="formControlsSelect">
															  <ControlLabel style = {label}>Scenario</ControlLabel>
															  <FormControl componentClass="select" placeholder="select">
																<option value="select"></option>
																<option value="other">scenario 1</option>
																<option value="other">scenario 2</option>
															  </FormControl>
															</FormGroup>
															<FormGroup >
																<ControlLabel style= {label}>My scenario</ControlLabel>
																<FormControl.Static style = {cadre}>
																	<li>elem1</li>
																	<li>elem2</li>
																	<li>elem3</li>
																</FormControl.Static>
															</FormGroup>
														</form>
														<div style = {cadre}>
															<ButtonGroup vertical>
																<label style= {label}>Start</label>		
																<Button type="submit" style = {buttonSimu}>
																	Start the simulation
																</Button>
																<Button type="submit" style = {buttonSimu}>
																	Show the results
																</Button>
																<Button type="submit" style = {buttonSimu}>
																	Show the sensibility
																</Button>		
															</ButtonGroup>
														</div>
													</Tab>
												</Tabs>
											</Panel>
										</Col>
									</Row>
								</Grid>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
