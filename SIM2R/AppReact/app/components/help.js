import React from 'react';
import {jumbotron, h2, h3, h3Bis, panelDefaultHelp, panelHeader, cadreHelp, cadre} from '../css/style';
import {Button, Modal, ButtonGroup, Row, Col, Grid, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


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
					<div className="panel panel-default" style = {panelDefaultHelp}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Help tips:</h3>
						</div>
						<div className="panel-body">
							<div className="container">							 
								<section>
									<Grid  style = {cadreHelp}>
										<Row className="show-grid">
											<Col sm={12} md={12}>								
												<ButtonGroup vertical>
													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ show: true})}
															style={{width:250}}
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
																<Modal.Title id="contained-modal-title" style = {h3Bis}>Why? you ask.</Modal.Title>
															</Modal.Header>
															<Modal.Body style={cadre}>
																Simply because there are a lot of parameters to take into account. Furthermore, the number of passengers the simulation has to create for each stations is insanely high.
															</Modal.Body>
														</Modal>
													</div>
													
													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ showBis: true})}
															style={{width:250}}
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
															<Modal.Body style={cadre}>
																only i know
															</Modal.Body>
														</Modal>
													</div>
													<div className="modal-container">
														<Button
															bsStyle="primary"
															onClick={() => this.setState({ show3: true})}
															style={{width:250}}
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
															<Modal.Body style={cadre}>
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

