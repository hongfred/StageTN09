import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, navSimu} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../reduxStore/actions/actions'


function FieldGroup({ id, label, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export class Page3h extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			result: ["Lance la simu"],
			show: false,
		};
    }

	setStateAsync(state) {
		return new Promise((resolve) => {
		  this.setState(state, resolve)
		});
	}	
	async fetchData(){
		try{
			const res = await fetch('http://localhost:1337/testSimu')
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
	testStore(){
		this.props.store.dispatch(addTodo('ça marche'))
		alert(JSON.stringify(this.props.store.getState()))
	}
	render(){
        const close = () => this.setState({ show: false });
		return (
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
						<label style = {label}>
							My database and parameters:
						</label>
						<div style = {cadre}>
							<li>elem1</li>
							<li>elem2</li>
							<li>elem3</li>
						</div>
					</Panel>				
				</Col>
			</Row>
		);
	}
}

