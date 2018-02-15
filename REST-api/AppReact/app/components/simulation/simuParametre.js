import React from 'react';
import {h3Bis, label, cadre, buttonSimu, button} from '../../css/style';
import {Button, Modal, Row, Col, Grid, Panel, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../../reduxStore/actions/actions';


function FieldGroup({ id, label, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export class SimuParametre extends React.Component{
	constructor(props) {
		super(props);
		this.state = {};
    }

	render(){
        const close = () => this.setState({ show: false });
		return (
			<div style = {cadre}>
				<Grid>
					<form>
						<FormGroup controlId="formControlsSelect">
						  <ControlLabel style = {label}>Select your database</ControlLabel>
						  <FormControl componentClass="select" placeholder="select">
							<option></option>
							<option value="">MyDatabase</option>
							<option value="other">...</option>
						  </FormControl>
						</FormGroup>
						<Button bsStyle="primary">Import a database</Button>
					</form>
				
					<Row style={{paddingTop:10}}>		
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
									  <ControlLabel>Start</ControlLabel>
									  <FormControl componentClass="select" placeholder="select">
										<option value="select">hour</option>
										<option value="other">...</option>
									  </FormControl>
									</FormGroup>
								</form>
							</Modal.Body>
						</Modal>
						<Button style={button}>
						  Save
						</Button>	
					</Row>
				</Grid>
			</div>
		);
	}
}

