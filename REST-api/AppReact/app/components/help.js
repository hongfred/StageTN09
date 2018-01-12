import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


export class Help extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            show: false,
			showBis: false,
			show3: false
        };
    }
	render(){
		const close = () => this.setState({ show: false});
		const CloseBis = () => this.setState({ showBis: false});
		const Close3 = () => this.setState({ show3: false});
		return (
		
			
			<div>
				<h2 className = "text-center" style = {h2}>Need a hand?</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Help tips:</h3>
						</div>
						<div className="panel-body">
							<div className="container">							 
								<section>
									<Grid  style = {cadre}>
										<Row className="show-grid">
											<Col sm={12} md={12}>								
												<ButtonGroup vertical>

													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ show: true})}
														>
															Why is the simulation so slow?
														</Button>

														<Modal
															show={this.state.show}
															onHide={close}
															container={this}
															aria-labelledby="contained-modal-title"
														>
															<Modal.Header closeButton>
																<Modal.Title id="contained-modal-title" style = {h3Bis}>Why is it so damn slow?</Modal.Title>
															</Modal.Header>
															<Modal.Body>
																You can't change fate as you can't change the slowness of this simulation
															</Modal.Body>
														</Modal>
													</div>
													
													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ showBis: true})}
														>
															Why doesn't it work?
														</Button>

														<Modal
															show={this.state.showBis}
															onHide={CloseBis}
															container={this}
															aria-labelledby="contained-modal-title"
														>
															<Modal.Header closeButton>
																<Modal.Title id="contained-modal-title"
																style = {h3Bis}>Why, you ask?</Modal.Title>
															</Modal.Header>
															<Modal.Body>
																only i know
															</Modal.Body>
														</Modal>
													</div>
													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ show3: true})}
														>
															Contact the admin
														</Button>

														<Modal
															show={this.state.show3}
															onHide={Close3}
															container={this}
															aria-labelledby="contained-modal-title"
														>
															<Modal.Header closeButton>
																<Modal.Title id="contained-modal-title"
																style = {h3Bis}>Contact the mighty</Modal.Title>
															</Modal.Header>
															<Modal.Body>
																	<FormGroup controlId="formControlsTextarea">
																	  <ControlLabel>Message</ControlLabel>
																	  <FormControl componentClass="textarea" placeholder="textarea" />
																	</FormGroup>

																	<Button type="submit">
																	  Submit
																	</Button>
															</Modal.Body>
														</Modal>
													</div>
												</ButtonGroup>
											</Col>
										</Row>
									</Grid>
								</section>
							</div>
						</div>
					</div>
				</section>	
			</div>		
		);
	}
}

