import React from 'react';
import {button, cadre, row, ul, selectMult, separation, separationFirst, label, buttonNav, affichage, span, field} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	itemsFetchData,
	addScenarioALien,
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

class AugmentationLien extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this);
		this.fetchVoisins = this.fetchVoisins.bind(this);
		this.fetchComposants = this.fetchComposants.bind(this);
		this.resetCV = this.resetCV.bind(this);
		this.resetV = this.resetV.bind(this);
    }
	
	erreurD(){
		document.getElementById('errorA1D').setAttribute('hidden','true');
	}
	erreurF(){
		document.getElementById('errorA1F').setAttribute('hidden','true');
	}
	erreurL(){
		document.getElementById('errorA1L').setAttribute('hidden','true');
	}
	erreurnD(){
		document.getElementById('errorA1nD').setAttribute('hidden','true');
	}
	erreurnA(){
		document.getElementById('errorA1nA').setAttribute('hidden','true');
	}
	erreurT(){
		document.getElementById('errorA1T').setAttribute('hidden','true');
	}

	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])(h|H|:)[0-5][0-9]$/.test(this.props.debutA1);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])(h|H|:)[0-5][0-9]$/.test(this.props.finA1);
		const reg3=!/^[0-9]*$/.test(this.props.tauxA1);
		if(reg1){
			 document.getElementById('errorA1D_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorA1D').removeAttribute('hidden');
		}
	
		if(reg2){
			document.getElementById('errorA1F_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorA1F').removeAttribute('hidden');
		}
		
		if(!this.props.ligneA1){
			document.getElementById('errorA1L_info').innerHTML="Sélectionnez une ligne!!";
			document.getElementById('errorA1L').removeAttribute('hidden');
		}
		
		if(!this.props.nDA1 || this.props.nDA1 ==''){
			document.getElementById('errorA1nD_info').innerHTML="Sélectionnez un noeud de départ!!";
			document.getElementById('errorA1nD').removeAttribute('hidden');
		}
		
		if(!this.props.nAA1 || this.props.nAA1 ==''){
			document.getElementById('errorA1nA_info').innerHTML="Sélectionnez un noeud d'arrivée!!";
			document.getElementById('errorA1nA').removeAttribute('hidden');
		}
		
		if(reg3){
			document.getElementById('errorA1T_info').innerHTML="Format du taux non conforme!!";
			document.getElementById('errorA1T').removeAttribute('hidden');
		}

		if(!(reg1 || reg2 || !this.props.ligneA1 || !this.props.nDA1 || this.props.nDA1 =='' || !this.props.nAA1 || this.props.nAA1 =='' || reg3)){
			this.props.add(this.props.debutA1,this.props.finA1,	this.props.nDA1, this.props.nAA1, this.props.ligneA1,this.props.tauxA1)
			this.props.reset();
			this.props.deleteC();
			this.props.deleteV();
		}
	}
	
	resetCV(){
		this.props.deleteC();
		this.props.deleteV();
		if(this.props.nDA1!=undefined){
			this.props.resetVar('nDA1');
		}
		if(this.props.nAA1!=undefined){
			this.props.resetVar('nAA1');
		}
	}
	resetV(){
		this.props.deleteV();
		if(this.props.nDA1!=undefined){
			this.props.resetVar('nDA1');
		}
		if(this.props.nAA1!=undefined){
			this.props.resetVar('nAA1');
		}
	}
	
	fetchComposants(ligne){
		this.props.deleteV();
		let url = "http://localhost:1337/fetch/composants/"+ligne;
		this.props.fetchData(url, "5");	
		if(this.props.nDA1!=undefined){
			this.props.resetVar('nDA1');
		}
		if(this.props.nAA1!=undefined){
			this.props.resetVar('nAA1');
		}
	}
	fetchVoisins(ligne,id){
		let url = "http://localhost:1337/fetch/voisins/"+ligne+"/"+id;
		this.props.fetchData(url, "6");	
		if(this.props.nAA1!=undefined){
			this.props.resetVar('nAA1');
		}
	}

	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
				<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Augmentation du taux de temps sur un lien</label>
				</Row>
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>
								<ul>
									<li>Debut: {JSON.stringify(this.props.debutA1)}</li>
									<li>Fin: {JSON.stringify(this.props.finA1)}</li>
									<li>Départ: {JSON.stringify(this.props.nDA1)}</li>
									<li>Arrivée: {JSON.stringify(this.props.nAA1)}</li>
									<li>Ligne: {JSON.stringify(this.props.ligneA1)}</li>
									<li>Taux: {JSON.stringify(this.props.tauxA1)}</li>
								</ul>
							</div>	
							<Col sm={6}>
								<Field name="debutA1" component={renderField} type="text" placeholder="ex: 09h00" label="Heure de début" onChange={this.erreurD}/>
								<span id="errorA1D" role="alert" hidden style={span}>
									<span id='errorA1D_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="finA1" component={renderField} type="text" placeholder="ex: 23h00" label="Heure de fin" onChange={this.erreurF}/>
								<span id="errorA1F" role="alert" hidden style={span}>
									<span id='errorA1F_info'></span>
								</span>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={4} >		
								<div>
									<label>Ligne</label>
									<div>
										<Field name="ligneA1" size="4" component="select" onChange={this.erreurL}>
											<option style={separationFirst} key="null" value=""
												onClick={() => {
													this.resetCV();
												}}
											>
												select...
											</option>
											{this.props.MesLignes.map(items =>
											<option key={items.idatelier}
												onClick={() => {
													this.fetchComposants(
													  items.ligne
													);
												}}
												style={separation}
											>
												{items.ligne}
											</option>)
											}
										</Field>
									</div>
									<span id="errorA1L" role="alert" hidden style={span}>
											<span id='errorA1L_info'></span>
									</span>
								</div>
							</Col>
							<Col sm={8}>
								<div>
									<label>Noeud de départ</label>
									<div>
										<Field name="nDA1" component="select" size="4" style={selectMult} onChange={this.erreurnD}>
											<option style={separationFirst} key="null" value=""
												onClick={() => {
													this.resetV();
												}}
											>
												select...
											</option>
											{this.props.MesComposantsA.map(composant =>
												<option key={composant.idcomposante} 
													onClick={() => {
														this.fetchVoisins(
															this.props.ligneA1,
															composant.idcomposante
														);
													}} style={separation}
												>
													{composant.NomComposante}
												</option>)
											}
										</Field>
									</div>
									<span id="errorA1nD" role="alert" hidden style={span}>
												<span id='errorA1nD_info'></span>
									</span>
								</div>
							</Col>
						</Row>
						<Row className="show-grid" style ={row}>
							<Col sm={12}>
								<div>
									<label>Noeud d'arrivée</label>
									<div>
										<Field name="nAA1" component="select" size="4" style={selectMult} onChange={this.erreurnA}>
											<option style={separationFirst} key="null" value="">
												select...
											</option>
											{this.props.MesVoisinsA.map(composant =>
											<option key={composant.idcomposante} style={separation}>{composant.NomComposante}</option>)
											}
										</Field>
									</div>
									<span id="errorA1nA" role="alert" hidden style={span}>
										<span id='errorA1nA_info'></span>
									</span>
								</div>
							</Col>
							
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12}>		
							    <Field name="tauxA1" component={renderField} type="text" placeholder="ex: 23" label="Taux d'augmentation du temps (%)" onChange={this.erreurT}/>	
								<span  id="errorA1T"  role="alert" hidden style={span}>
									<span id='errorA1T_info'></span>
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
AugmentationLien = reduxForm({
  form: 'addScenarioALien'  // a unique identifier for this form
})(AugmentationLien)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioALien') // <-- same as form name
AugmentationLien = connect(
  state => {
    // or together as a group
    const { debutA1, finA1, nDA1, nAA1, ligneA1, tauxA1} = selector(state, 'debutA1', 'finA1','nDA1', 'nAA1', 'ligneA1', 'tauxA1')
    return {
	  debutA1,
	  finA1,
	  nDA1,
	  nAA1,
	  ligneA1,
	  tauxA1
    }
  }
)(AugmentationLien)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine,
		MesComposantsA: state.itemsComposantA,
		MesVoisinsA: state.itemsVoisinA
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutA1,finA1,nDA1,nAA1, ligneA1,tauxA1) => dispatch(addScenarioALien(debutA1,finA1, nDA1, nAA1,ligneA1,tauxA1)),
		fetchData: (url, option) => dispatch(itemsFetchData(url, option)),
		deleteC: () => dispatch(deleteComposant()),
		deleteV: () => dispatch(deleteVoisin()),
		resetVar: (variable) => dispatch(change('addScenarioALien', variable, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AugmentationLien);
