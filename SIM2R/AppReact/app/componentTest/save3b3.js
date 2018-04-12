import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, textArea, navSimu} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addScenario,
  scenarioPostData
  
} from '../reduxStore/actions/actions'


class Page3b3 extends React.Component{
	constructor(props) {
		super(props);
		this.testStore = this.testStore.bind(this);
		
    }
	testStore(){
		this.props.post('รงa marche')
	}
	render(){
		return (
			<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
				<Row className="clearfix">
					<Col sm={8}>
						<Tab.Content animation>
							<Tab.Pane eventKey="first" style = {cadre}>
								<Grid>
									<form>
										<Row className="show-grid" >
											<Row className="show-grid" >
												<div style = {cadre}>
													<ul>
														{JSON.stringify(this.props)}
													</ul>
												</div>	
												<Col sm={6}>
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>start</ControlLabel>
														<FormControl componentClass="textarea" style={textArea} placeholder="ex: 00:00" />
													</FormGroup>
												</Col>
												<Col sm={6}>
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>end</ControlLabel>
														<FormControl componentClass="textarea" style={textArea} placeholder="ex: 00:00" />
													</FormGroup>
												</Col>
											</Row>
											<Row className="show-grid" >
												<Col md={12}>		
													<FormGroup controlId="formControlsSelect">
													  <ControlLabel>Select</ControlLabel>
													  <FormControl componentClass="select" placeholder="select">
														<option value="select">select</option>
														<option value="other">...</option>
													  </FormControl>
													</FormGroup>		
												</Col>
											</Row>
											<Row className="show-grid" >
												<Col md={12}>		
													<FormGroup controlId="formControlsTextarea">
														<ControlLabel>taux d'augmentation</ControlLabel>
														<FormControl componentClass="textarea" style={textArea} placeholder="Taux en %, ex: 0" />
													</FormGroup>		
												</Col>
											</Row>
										</Row>
										<Row className="show-grid">
											<Button onClick={this.testStore} style = {button} >
												Submit
											</Button>
										</Row>
									</form>
								</Grid>	
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
				
			</Tab.Container>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        scenario: state.scenario
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        post: (text) => dispatch(addScenario(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3b3);
