import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, navSimu, row, ul, selectMult, separation, buttonNav} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  itemsFetchData,
  addScenarioRLien,
  toggleScenario 
} from '../reduxStore/actions/actions'
import { Field, reduxForm, formValueSelector, reset} from 'redux-form'

class Page3b2 extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
		this.toggle = this.toggle.bind(this)
		this.fetchVoisins = this.fetchVoisins.bind(this)
    }
	addS(){
		this.props.add(this.props.debutR1,this.props.finR1,	this.props.nDR1, this.props.nAR1, this.props.ligneR1,this.props.tauxR1)
		this.props.reset();
	}
	toggle(id){
		this.props.toggleS(id);	
	}
	fetchVoisins(id){
		let url = "http://localhost:1337/fetch/voisin/"+id;
		this.props.fetchData(url, "4");	
	}
	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
				<Row className="clearfix">
					<Col sm={4}>
						<Nav bsStyle="pills" stacked style = {navSimu}>
							<NavItem eventKey="first" style={buttonNav}>
								inopérabilité d'un lien
							</NavItem>
							<NavItem eventKey="second" style={buttonNav}>
								inopérabilité d'une ligne
							</NavItem>
							<NavItem eventKey="third" style={buttonNav}>
								capacité d'un lien
							</NavItem>
						</Nav>
					</Col>
					
					<Col sm={8}>
						<Tab.Content animation>
							<Tab.Pane eventKey="first" style = {cadre}>
								<Grid>
									<form>
										<Row className="show-grid" style = {row}>
											<Row className="show-grid" >
												<div style = {cadre}>
													<ul>
														debut: {JSON.stringify(this.props.debutR1)},
														fin: {JSON.stringify(this.props.finR1)},
														départ: {JSON.stringify(this.props.nDR1)},
														arrivée: {JSON.stringify(this.props.nAR1)},
														{JSON.stringify(this.props.ligneR1)},
														taux: {JSON.stringify(this.props.tauxR1)}
													</ul>
												</div>	
												<Col sm={6}>
												  <div>
													<label>Debut</label>
													<div>
													  <Field name="debutR1" component="input" type="text" placeholder="ex: 09h00"/>
													</div>
												  </div>
												</Col>
												<Col sm={6}>
												  <div>
													<label>Fin</label>
													<div>
													  <Field name="finR1" component="input" type="text" placeholder="ex: 23h00"/>
													</div>
												  </div>
												</Col>
											</Row>
											<Row className="show-grid" style = {row}>
												<Col md={12} >		
													<div>
														<label>Ligne</label>
														<div>
															<Field name="ligneR1" component="select">
																<option></option>
																{this.props.MesLignes.map(items =>
																<option key={items.idatelier}>{items.ligne}</option>)
																}
															</Field>
														</div>
													</div>
												</Col>
											</Row>
											<Row className="show-grid" style = {row}>
												<Col sm={12}>
													<label>Noeud de départ</label>
													<div>
														<Field name="nDR1" component="select" multiple value={[]} type="select-multiple" style={selectMult}>
															{this.props.MesComposants.map(composant =>
																<option key={composant.idcomposante} 
																	onClick={() => {
																		this.fetchVoisins(
																		  composant.idcomposante
																		);
																	}} style={separation}
																>
																	{composant.NomComposante}
																</option>)
															}
														</Field>
												    </div>
												</Col>
											</Row>
											<Row className="show-grid" style ={row}>
												<Col sm={12}>
													<label>Noeud d'arrivé</label>
													<div>
														<Field name="nAR1" component="select" multiple value={[]} type="select-multiple" style={selectMult}>
															{this.props.MesVoisins.map(composant =>
															<option key={composant.idcomposante} style={separation}>{composant.NomComposante}</option>)
															}
														</Field>
												    </div>
												</Col>
											</Row>
											<Row className="show-grid" style = {row}>
												<Col md={12}>		
												  <div>
													<label>Taux de réduction de la capacité(%)</label>
													<div>
													  <Field name="tauxR1" component="input" type="text" placeholder="ex: 23"/>
													</div>
												  </div>		
												</Col>
											</Row>
										</Row>
										<Row className="show-grid">
											<Button onClick={this.addS}style = {button}>
												Submit
											</Button>
										</Row>
									</form>
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
							<Tab.Pane eventKey="third" style = {cadre}>
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
		);
	}
}
Page3b2 = reduxForm({
  form: 'addScenarioR'  // a unique identifier for this form
})(Page3b2)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioR') // <-- same as form name
Page3b2 = connect(
  state => {
    // or together as a group
    const { debutR1, finR1, nDR1, nAR1, ligneR1, tauxR1} = selector(state, 'debutR1', 'finR1','nDR1', 'nAR1', 'ligneR1', 'tauxR1')
    return {
	  debutR1,
	  finR1,
	  nDR1,
	  nAR1,
	  ligneR1,
	  tauxR1
    }
  }
)(Page3b2)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine,
		MesScenarios: state.scenarios,
		MesComposants: state.itemsComposant,
		MesVoisins: state.itemsVoisin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutR1,finR1,nDR1,nAR1, ligneR1,tauxR1) => dispatch(addScenarioRLien(debutR1,finR1, nDR1, nAR1,ligneR1,tauxR1)),
		toggleS: (id) => dispatch(toggleScenario(id)),
		fetchData: (url, option) => dispatch(itemsFetchData(url, option))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3b2);

