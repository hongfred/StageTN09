import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, navSimu, buttonNav} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../reduxStore/actions/actions'


export class Page3b1 extends React.Component{
	constructor(props) {
		super(props);
		this.state = {

		};
    }
	render(){
		return (
			<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
				<Row className="clearfix">
					<Col sm={3}>
						<Nav bsStyle="pills" stacked style = {navSimu}>
							<NavItem eventKey="first" style={buttonNav}>
								element 1
							</NavItem>
							<NavItem eventKey="second" style={buttonNav}>
								element 2
							</NavItem>
						</Nav>
					</Col>
					
					<Col sm={9}>
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
		);
	}
}

