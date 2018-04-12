import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, cadreSimu, tabSimu, buttonSimu, navSimu, affichage, ul} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Chart from '../components/chart';
import { connect } from 'react-redux';
import {
  itemsFetchData,
  toggleScenario,
  deleteScenario
} from 'D:/frederic/Documents/cours/code/AppReact/app/reduxStore/actions/actions'

function ItemLister(props) {
	return( 
		<div style = {affichage}>
			<h4>Mes résultats: </h4>
				{JSON.stringify(props.result.MesResultats)}
		</div>
	)
}
const AfficheA = (scenario) => (
	<div>
		{scenario.elem.elem.taux}% d'{scenario.elem.elem.cas} de {scenario.elem.elem.debut} à {scenario.elem.elem.fin} sur la {scenario.elem.elem.ligne}
		
	</div>
)
const AfficheR = (scenario) => (
	<div>
		{scenario.elem.elem.taux}% de {scenario.elem.elem.cas} de {scenario.elem.elem.debut} à {scenario.elem.elem.fin}
		sur la {scenario.elem.elem.ligne} de {scenario.elem.elem.nD} à {scenario.elem.elem.nA}
	</div>
)
function Affiche(scenario){
	switch(scenario.elem.cas){
		case 'augmentation':
			return(<AfficheA elem={scenario}/>)
		case 'reduction':
			return(<AfficheR elem={scenario}/>)
	}
}

class Page3d extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.simulation = this.simulation.bind(this)
		this.toggle = this.toggle.bind(this)
		this.supprimer = this.supprimer.bind(this)
    }
	
	simulation(){
		this.props.fetchData("http://localhost:1337/testSimu", "1");	
	}
	toggle(id){
		this.props.toggleS(id);	
	}
	supprimer(){
		this.props.deleteS();	
	}
	render(){
		const close2 = () => this.setState({ show: false });
		return (
            <Panel header="Scenarios" bsStyle="primary">
				<label style = {label}>Do not interupt the simulation!</label>
				<Tabs defaultActiveKey={2} id='tabs' style ={tabSimu}>
					<Tab eventKey={1} title="Without">
					<div>
						<ButtonGroup vertical style={cadreSimu}>
							<label style= {label}>Start</label>	
							<Button
								bsStyle="primary"
								onClick={this.simulation}
							>
								Simulation
							</Button>
							<ItemLister result={this.props}/>
						</ButtonGroup>
					</div>
					</Tab>
					<Tab eventKey={2} title="With">
						<div style = {cadre}>
							<form>
								<FormGroup controlId="formControlsSelect">
								  <ControlLabel style = {label}>Import scenario</ControlLabel>
								  <FormControl componentClass="select" placeholder="select">
									<option value="select"></option>
									<option value="other">scenario 1</option>
									<option value="other">scenario 2</option>
								  </FormControl>
								</FormGroup>
								<label style = {label}>
									My scenarios:
								</label>
								<ul style={ul}>
									{this.props.MesScenarios.length> 0 ? null : <li className = "no-scenario"><div style={{color: 'lightgrey'}}>add a scenario</div></li> }
									{this.props.MesScenarios.map(scenario =>
										<li key={scenario.id} 
											onClick={() => {
												this.toggle(
												  scenario.id
												);
											}}
											style={{borderBottom: 'solid', borderBottomWidth: 0.5, borderColor:'lightgrey', textDecoration: scenario.supp ? 'line-through' : 'none' }}
										>
											<Affiche elem={scenario}/>
										</li>
									)}
								</ul>
								<Button 
									onClick={this.supprimer}
									style = {buttonSimu}
								>
									supprimer
								</Button>
								<Button type="submit" style = {buttonSimu}>
									Sauvegarder scenarios
								</Button>	
							</form>
						</div>
						<div>
							<ButtonGroup vertical style={cadreSimu}>
								<label style= {label}>Start</label>	
								<Button
									bsStyle="primary"
									onClick={this.simulation}
								>
									Simulation
								</Button>
								<ItemLister result={this.props}/>
								<Button
									bsStyle="primary"
									onClick={() => this.setState({ show: true })}
								>
									Show results
								</Button>
								<Modal
									show={this.state.show}
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
												<Chart/>
											</div>
										</form>
									</Modal.Body>
								</Modal>
								<Button
									bsStyle="primary"
									onClick={this.simulation}
								>
									Show sensibility
								</Button>			
							</ButtonGroup>
						</div>
					</Tab>
				</Tabs>
			</Panel>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        MesResultats: state.results,
		MesScenarios: state.scenarios
        //hasErrored: state.itemsHasErrored,
        //isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, option) => dispatch(itemsFetchData(url, option)),
		toggleS: (id) => dispatch(toggleScenario(id)),
		deleteS: () => dispatch(deleteScenario())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3d);

