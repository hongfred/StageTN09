import React from 'react';
import {button, cadre, navSimu} from '../../../../css/style';
import {Button, Nav, NavItem, Tab, Row, Col, Grid, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../../../../reduxStore/actions/actions';


export class SimuPerturbation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {

		};
    }
	render(){
		return (	
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
		);
	}
}

