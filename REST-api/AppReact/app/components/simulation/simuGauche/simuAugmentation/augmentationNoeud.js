import React from 'react';
import {button, cadre, row, ul, selectMult, separation, label, buttonNav, affichage, field, span} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	itemsFetchData,
	addScenarioALien,
	deleteComposant,
	deleteVoisin
} from '../../../../reduxStore/actions/actions';
import { Field, reduxForm, formValueSelector, reset} from 'redux-form';

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

class AugmentationNoeud extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
    }
	
	erreurD(){
		document.getElementById('errorA2D').setAttribute('hidden','true');
	}
	
	erreurF(){
		document.getElementById('errorA2F').setAttribute('hidden','true');
	}
	
	erreurN(){
		document.getElementById('errorA2N').setAttribute('hidden','true');
	}
	
	erreurT(){
		document.getElementById('errorA2T').setAttribute('hidden','true');
	}
	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.debutA2);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.finA2);
		const reg3=!/^[0-9]*$/.test(this.props.tempsA2);
		if(reg1){
			 document.getElementById('errorA2D_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorA2D').removeAttribute('hidden');
		}

		if(reg2){
			document.getElementById('errorA2F_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorA2F').removeAttribute('hidden');
		}
		
		if(!this.props.noeudA2){
			document.getElementById('errorA2N_info').innerHTML="Selectionnez une ligne!!";
			document.getElementById('errorA2N').removeAttribute('hidden');
		}
		
		if(reg3){
			document.getElementById('errorA2T_info').innerHTML="Entrez un temps correct!!";
			document.getElementById('errorA2T').removeAttribute('hidden');
		}
		

		if(!(reg1 || reg2 || !this.props.noeudA2 || reg3)){
			this.props.add(this.props.debutA2,this.props.finA2,	this.props.noeudA2, this.props.tempsA2)
			this.props.reset();
		}
	}


	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
				<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Augmentation du temps de parcours sur  un noeud</label>
				</Row>
				
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>
								<ul>
									debut: {JSON.stringify(this.props.debutA2)},
									fin: {JSON.stringify(this.props.finA2)},
									départ: {JSON.stringify(this.props.noeudA2)},
									Temps: {JSON.stringify(this.props.tempsA2)}
								</ul>
							</div>	
							<Col sm={6}>
								<Field name="debutA2" component={renderField} type="text" placeholder="ex: 09h00" label="Heure de début" onChange={this.erreurD}/>
								<span id="errorA2D" role="alert" hidden style={span}>
									<span id='errorA2D_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="finA2" component={renderField} type="text" placeholder="ex: 23h00" label="Heure de fin" onChange={this.erreurF}/>
								<span id="errorA2F" role="alert" hidden style={span}>
									<span id='errorA2F_info'></span>
								</span>							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col sm={12}>
								<label>Noeud de départ</label>
								<div>
									<Field name="noeudA2" component="select" multiple value={[]} type="select-multiple" style={selectMult} onChange={this.erreurN}>
										{this.props.MesComposants.map(composant =>
											<option key={composant.idcomposante} 
											>
												{composant.NomComposante}
											</option>)
										}
									</Field>
								</div>
								<span id="errorA2N" role="alert" hidden style={span}>
										<span id='errorA2N_info'></span>
								</span>	
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12}>		
								<Field name="tempsA2" component={renderField} type="text" placeholder="ex: 35" label="Temps de correspondance supplémentaire (min)" onChange={this.erreurT}/>
								<span id="errorA2T" role="alert" hidden style={span}>
									<span id='errorA2T_info'></span>
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
AugmentationNoeud = reduxForm({
  form: 'addScenarioANoeud'  // a unique identifier for this form
})(AugmentationNoeud)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioANoeud') // <-- same as form name
AugmentationNoeud = connect(
  state => {
    // or together as a group
    const { debutA2, finA2, noeudA2, tempsA2} = selector(state, 'debutA2', 'finA2','noeudA2', 'tempsA2')
    return {
	  debutA2,
	  finA2,
	  noeudA2,
	  tempsA2
    }
  }
)(AugmentationNoeud)

const mapStateToProps = (state) => {
    return {
		MesComposants: state.itemsComposant
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutA2,finA2,noeudA2,tempsA2) => dispatch(addScenarioALien(debutA2,finA2, noeudA2,tempsA2)),
		fetchData: (url, option) => dispatch(itemsFetchData(url, option)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AugmentationNoeud);
