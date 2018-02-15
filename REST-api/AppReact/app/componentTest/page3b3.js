import React from 'react'
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, textArea, navSimu, row, affichage} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  itemsFetchData,
  addScenarioALigne
} from '../reduxStore/actions/actions'
import { Field, reduxForm, formValueSelector, reset} from 'redux-form'


class Page3b3 extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
    }

	addS(){
		this.props.add(this.props.debut,this.props.fin,this.props.ligne,this.props.taux)
		this.props.reset();
	}
	render(){
	  const { handleSubmit, pristine, reset, submitting} = this.props
	  return (
		<Tab.Container id="left-tabs-example" defaultActiveKey="first" style = {cadre}>
			<Row className="clearfix">
				<Col sm={8}>
					<Tab.Content animation>
						<Tab.Pane eventKey="first" style = {cadre}>
							<Grid >
								<form>
									<Row className="show-grid" style = {row}>
										<Row className="show-grid" >
											<div style = {affichage}>
												<ul>
													debut: {JSON.stringify(this.props.debut)},
													fin: {JSON.stringify(this.props.fin)},
													{JSON.stringify(this.props.ligne)},
													taux: {JSON.stringify(this.props.taux)}
												</ul>
											</div>	
											<Col sm={6}>
											  <div>
												<label>Debut</label>
												<div>
												  <Field name="debut" component="input" type="text" placeholder="ex: 09h00"/>
												</div>
											  </div>
											</Col>
											<Col sm={6}>
											  <div>
												<label>Fin</label>
												<div>
												  <Field name="fin" component="input" type="text" placeholder="ex: 23h00"/>
												</div>
											  </div>
											</Col>
										</Row>
										<Row className="show-grid" style = {row}>
											<Col md={12} >		
												<div>
													<label>Ligne</label>
													<div>
														<Field name="ligne" component="select" style={{width:80}}>
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
											<Col md={12}>		
											  <div>
												<label>Taux d'augmentation(%)</label>
												<div>
												  <Field name="taux" component="input" type="text" placeholder="ex: 23"/>
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
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	  );
	};
};


Page3b3 = reduxForm({
  form: 'addScenarioR'  // a unique identifier for this form
})(Page3b3)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioR') // <-- same as form name
Page3b3 = connect(
  state => {
    // or together as a group
    const { debut, fin, ligne, taux} = selector(state, 'debut', 'fin', 'ligne', 'taux')
    return {
	  debut,
	  fin,
	  ligne,
	  taux
    }
  }
)(Page3b3)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine,
		MesScenario: state.scenario
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debut,fin,ligne,taux) => dispatch(addScenarioALigne(debut,fin,ligne,taux))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page3b3);