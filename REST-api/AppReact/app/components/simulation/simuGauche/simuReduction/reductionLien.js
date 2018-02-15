import React from 'react';
import {button, cadre, row, ul, selectMult, separation, label, buttonNav, affichage, span, field} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	itemsFetchData,
    addScenarioRLien,
	deleteComposant,
	deleteVoisin
} from '../../../../reduxStore/actions/actions';
import { Field, reduxForm, formValueSelector, reset, change} from 'redux-form';

const renderField = ({
  input,
  placeholder,
  type,
  label,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div style={field}>
      <input {...input} placeholder={placeholder} type={type}/>
    </div>
  </div>
)

class ReductionLien extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
		this.fetchVoisins = this.fetchVoisins.bind(this)
		this.fetchComposants = this.fetchComposants.bind(this)
    }
	
	erreurD(){
		document.getElementById('errorR1D').setAttribute('hidden','true');
	}
	erreurF(){
		document.getElementById('errorR1F').setAttribute('hidden','true');
	}
	erreurL(){
		document.getElementById('errorR1L').setAttribute('hidden','true');
	}
	erreurnD(){
		document.getElementById('errorR1nD').setAttribute('hidden','true');
	}
	erreurnA(){
		document.getElementById('errorR1nA').setAttribute('hidden','true');
	}
	erreurT(){
		document.getElementById('errorR1T').setAttribute('hidden','true');
	}
	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.debutR1);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.finR1);
		const reg3=!/^[0-9]*$/.test(this.props.tauxR1);
		if(reg1){
			 document.getElementById('errorR1D_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorR1D').removeAttribute('hidden');
		}

		if(reg2){
			document.getElementById('errorR1F_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorR1F').removeAttribute('hidden');
		}
		
		if(!this.props.ligneR1){
			document.getElementById('errorR1L_info').innerHTML="Sélectionnez une ligne!!";
			document.getElementById('errorR1L').removeAttribute('hidden');
		}
		
		if(!this.props.nDR1 || this.props.nDR1==''){
			document.getElementById('errorR1nD_info').innerHTML="Sélectionnez un noeud de départ!!";
			document.getElementById('errorR1nD').removeAttribute('hidden');
		}
		
		if(!this.props.nAR1 || this.props.nAR1==''){
			document.getElementById('errorR1nA_info').innerHTML="Sélectionnez un noeud d'arrivée!!";
			document.getElementById('errorR1nA').removeAttribute('hidden');
		}
		
		if(reg3){
			document.getElementById('errorR1T_info').innerHTML="Format du taux non conforme!!";
			document.getElementById('errorR1T').removeAttribute('hidden');
		}

		if(!(reg1 || reg2 || !this.props.ligneR1 || !this.props.nDR1 || this.props.nDR1=='' || !this.props.nAR1 || this.props.nAR1=='' || reg3)){
			this.props.add(this.props.debutR1,this.props.finR1,	this.props.nDR1, this.props.nAR1, this.props.ligneR1,this.props.tauxR1)
			this.props.reset();
			this.props.deleteC();
			this.props.deleteV();
		}
	}
	fetchComposants(ligne){
		this.props.deleteV();
		let url = "http://localhost:1337/fetch/composants/"+ligne;
		this.props.fetchData(url, "3");
		if(this.props.nDR1!=undefined){
			this.props.resetVar('nDR1');
		}
		if(this.props.nAR1!=undefined){
			this.props.resetVar('nAR1');
		}
	}
	fetchVoisins(ligne,id){
		let url = "http://localhost:1337/fetch/voisins/"+ligne+"/"+id;
		this.props.fetchData(url, "4");	
		if(this.props.nAR1!=undefined){
			this.props.resetVar('nAR1');
		}
	}

	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
			<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Rendre un lien inopérationnel</label>
				</Row>
				
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>
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
								<Field name="debutR1" component={renderField} type="text" placeholder="ex: 09h00" label="Heure de début" onChange={this.erreurD}/>
								<span id="errorR1D" role="alert" hidden style={span}>
									<span id='errorR1D_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="finR1" component={renderField} type="text" placeholder="ex: 23h00" label="Heure de fin" onChange={this.erreurF}/>
								<span id="errorR1F" role="alert" hidden style={span}>
									<span id='errorR1F_info'></span>
								</span>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={4} >		
								<div>
									<label>Ligne</label>
									<div>
										<Field name="ligneR1" size="4" component="select" onChange={this.erreurL}>
											<option></option>
											{this.props.MesLignes.map(items =>
											<option key={items.idatelier}
												onClick={() => {
													this.fetchComposants(
													  items.ligne
													);
												}}
											>
												{items.ligne}
											</option>)
											}
										</Field>
									</div>
									<span id="errorR1L" role="alert" hidden style={span}>
										<span id='errorR1L_info'></span>
									</span>
								</div>
							</Col>
							<Col sm={8}>
								<div>
									<label>Noeud de départ</label>
									<div>
										<Field name="nDR1" component="select" size="4" style={selectMult} onChange={this.erreurnD}>
											<option></option>
											{this.props.MesComposants.map(composant =>
												<option key={composant.idcomposante} 
													onClick={() => {
														this.fetchVoisins(
															this.props.ligneR1,
															composant.idcomposante
														);
													}} style={separation}
												>
													{composant.NomComposante}
												</option>)
											}
										</Field>
									</div>
									<span id="errorR1nD" role="alert" hidden style={span}>
											<span id='errorR1nD_info'></span>
									</span>
								</div>
							</Col>
						</Row>
						<Row className="show-grid" style ={row}>
							<Col sm={12}>
								<div>
									<label>Noeud d'arrivée</label>
									<div>
										<Field name="nAR1" component="select" size="4" style={selectMult} onChange={this.erreurnA}>
											<option></option>
											{this.props.MesVoisins.map(composant =>
											<option key={composant.idcomposante} style={separation}>{composant.NomComposante}</option>)
											}
										</Field>
									</div>
									<span id="errorR1nA" role="alert" hidden style={span}>
											<span id='errorR1nA_info'></span>
									</span>
								</div>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12}>			
							    <Field name="tauxR1" component={renderField} type="text" placeholder="ex: 23" label="Taux de réduction de la capacité (%)" onChange={this.erreurT}/>	
								<span  id="errorR1T"  role="alert" hidden style={span}>
									<span id='errorR1T_info'></span>
								</span>								  
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
		);
	}
}
ReductionLien = reduxForm({
  form: 'addScenarioRLien'  // a unique identifier for this form
})(ReductionLien)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioRLien') // <-- same as form name
ReductionLien = connect(
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
)(ReductionLien)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine,
		MesComposants: state.itemsComposantR,
		MesVoisins: state.itemsVoisinR
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutR1,finR1,nDR1,nAR1, ligneR1,tauxR1) => dispatch(addScenarioRLien(debutR1,finR1, nDR1, nAR1,ligneR1,tauxR1)),
		fetchData: (url, option) => dispatch(itemsFetchData(url, option)),
		deleteC: () => dispatch(deleteComposant()),
		deleteV: () => dispatch(deleteVoisin()),
		resetVar: (variable) => dispatch(change('addScenarioRLien', variable, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReductionLien);
