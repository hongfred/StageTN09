import React from 'react';
import {h3Bis, h4, label, cadre, cadreSimu, tabSimu, buttonSimu, affichage, ul, span} from '../../../css/style';
import {Button, Modal, ButtonGroup, Tab, Row, Col, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Chart from '../../chart';
import { connect } from 'react-redux';
import {
  itemsFetchData,
  toggleScenario,
  deleteScenario,
  scenarioPostData
} from '../../../reduxStore/actions/actions';
import {SimuParametre} from './simuParametre';

function ItemLister(props) {
	return( 
		<div style = {affichage}>
			<h4>Mes résultats: </h4>
				{JSON.stringify(props.result.MesResultats)}
		</div>
	)
}
const Affiche = (scenario) => (
	<div>
		{scenario.elem.elem.cas} de {scenario.elem.elem.taux}%  de {scenario.elem.elem.debut} à {scenario.elem.elem.fin} sur la {scenario.elem.elem.ligne}	
	</div>
)
const AfficheLien = (scenario) => (
	<div>
		{scenario.elem.elem.cas} de {scenario.elem.elem.taux}% de {scenario.elem.elem.debut} à {scenario.elem.elem.fin} sur la {scenario.elem.elem.ligne} de {scenario.elem.elem.nD} à {scenario.elem.elem.nA}
	</div>
)
const AfficheTrain = (scenario) => (
	<div>
		{scenario.elem.elem.cas} de {scenario.elem.elem.taux}%  de {scenario.elem.elem.debut} à {scenario.elem.elem.fin} sur la {scenario.elem.elem.noeud}	
	</div>
)
const AfficheNoeud = (scenario) => (
	<div>
		{scenario.elem.elem.cas} du temps de parcours de {scenario.elem.elem.temps}min  entre {scenario.elem.elem.debut} et {scenario.elem.elem.fin} sur {scenario.elem.elem.noeud}	
	</div>
)
const AfficheLigne = (scenario) => (
	<div>
		{scenario.elem.elem.ligne} inopérable de {scenario.elem.elem.debut} à {scenario.elem.elem.fin}
	</div>
)
function Display(scenario){
	switch(scenario.elem.cas){
		case 'augmentation':
			
			if(scenario.elem.nD!=null){
				return(<AfficheLien elem={scenario}/>)
			}
			else if(scenario.elem.temps!=null){
				return(<AfficheNoeud elem={scenario}/>)
			}
			else{
				return(<Affiche elem={scenario}/>)
			}
		case 'reduction':
			if(scenario.elem.nD!=null){
				return(<AfficheLien elem={scenario}/>)
			}
			else if(scenario.elem.noeud!=null){
				return(<AfficheTrain elem={scenario}/>)
			}
			else{
				return(<AfficheLigne elem={scenario}/>)
			}
	}
}

class SimuDroite extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.simulation = this.simulation.bind(this)
		this.toggle = this.toggle.bind(this)
		this.supprimer = this.supprimer.bind(this)
		this.postScenario = this.postScenario.bind(this)
    }
	
	erreurIns(){
		document.getElementById('errorInsert').setAttribute('hidden','true');
	}
	
	simulation(){
		this.props.fetchData("http://localhost:1337/testSimu", "1");	
	}
	postScenario(){
		if(this.props.MesScenarios ==""){
			document.getElementById('errorInsert_info').innerHTML="Vous n'avez pas entré de scénarios!!";
			document.getElementById('errorInsert').removeAttribute('hidden');
		}
		else{
			this.erreurIns();
			this.props.postData("http://localhost:1337/insertScenarios", this.props.MesScenarios);	
		}
	}
	toggle(id){
		this.props.toggleS(id);	
	}
	supprimer(){
		this.props.deleteS();	
	}
	render(){
		const close = () => this.setState({ show: false });
		return (
            <Panel header="Scenarios" bsStyle="primary">
				<label>You have to do a simulation without scenario first. It'll be used as a base to calculate the resilience</label>
				<Tabs defaultActiveKey={2} id='tabs' style ={tabSimu}>
					<Tab eventKey={1} title="Without">
					<SimuParametre/>
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
									My scenarios
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
											<Display elem={scenario}/>
										</li>
									)}
								</ul>
								<Button 
									onClick={this.supprimer}
									style = {buttonSimu}
								>
									supprimer
								</Button>
								<Button style = {buttonSimu}
								onClick={this.postScenario}
								>
									Sauvegarder scenarios
								</Button>	
								<div style={{marginLeft:90,marginTop:5}}>
									<span id="errorInsert" role="alert" hidden style={span}>
										<span id='errorInsert_info'></span>
									</span>
								</div>
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
									onHide={close}
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
		deleteS: () => dispatch(deleteScenario()),
		postData: (url, data) => dispatch(scenarioPostData(url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimuDroite);



