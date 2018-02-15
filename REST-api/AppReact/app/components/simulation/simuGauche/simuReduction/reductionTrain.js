import React from 'react';
import {button,cadre, cadre1, row, affichage,span, field, label} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {addScenarioRTrain} from '../../../../reduxStore/actions/actions';
import { Field, reduxForm, formValueSelector, reset} from 'redux-form'

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

class ReductionTrain extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
    }

	erreurD(){
		document.getElementById('errorR3D').setAttribute('hidden','true');
	}
	erreurF(){
		document.getElementById('errorR3F').setAttribute('hidden','true');
	}
	erreurN(){
		document.getElementById('errorR3N').setAttribute('hidden','true');
	}
	erreurT(){
		document.getElementById('errorR3T').setAttribute('hidden','true');
	}
	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.debutR3);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.finR3);
		const reg3=!/^[0-9]*$/.test(this.props.tauxR3);
		if(reg1){
			 document.getElementById('errorR3D_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorR3D').removeAttribute('hidden');
		}

		if(reg2){
			document.getElementById('errorR3F_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorR3F').removeAttribute('hidden');
		}
		
		if(!this.props.noeudR3){
			document.getElementById('errorR3N_info').innerHTML="Selectionnez un noeud!!";
			document.getElementById('errorR3N').removeAttribute('hidden');
		}
		
		if(reg3){
			document.getElementById('errorR3T_info').innerHTML="Format du taux non conforme!!";
			document.getElementById('errorR3T').removeAttribute('hidden');
		}

		if(!(reg1 || reg2 || reg3 || !this.props.noeudR3)){
			this.props.add(this.props.debutR3,this.props.finR3, this.props.noeudR3,this.props.tauxR3)
			this.props.reset();
		}
	}
	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
				<Row style={{paddingTop:5, paddingLeft:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Réduction de la capacité des trains sur une ligne</label>
				</Row>
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>
								Réduction de {this.props.tauxR3}%  de {this.props.debutR3} à {this.props.finR3} sur le {this.props.noeudR3}
							</div>	
							<Col sm={6}>
								<Field name="debutR3" component={renderField} type="text" placeholder="ex: 09h00" label="Heure de début" onChange={this.erreurD}/>
								<span id="errorR3D" role="alert" hidden style={span}>
									<span id='errorR3D_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="finR3" component={renderField} type="text" placeholder="ex: 23h00" label="Heure de fin" onChange={this.erreurF}/>
								<span id="errorR3F" role="alert" hidden style={span}>
									<span id='errorR3F_info'></span>
								</span>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12} >		
								<div>
									<label>Sélectionnez un noeud</label>
									<div>
										<Field name="noeudR3" component="select" style={{width:80}} onChange={this.erreurN}>
											<option></option>
											{this.props.MesLignes.map(items =>
											<option key={items.idatelier}>{items.ligne}</option>)
											}
										</Field>
									</div>	
									<span id="errorR3N" role="alert" hidden style={span}>
										<span id='errorR3N_info'></span>
									</span>	
								</div>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12}>		
								<Field name="tauxR3" component={renderField} type="text" placeholder="ex: 23" label="Taux de réduction de la capacité(%)" onChange={this.erreurT}/>	
								<span  id="errorR3T"  role="alert" hidden style={span}>
									<span id='errorR3T_info'></span>
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
ReductionTrain = reduxForm({
  form: 'addScenarioRTrain'  // a unique identifier for this form
})(ReductionTrain)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioRTrain') // <-- same as form name
ReductionTrain = connect(
  state => {
    // or together as a group
    const { debutR3, finR3, noeudR3, tauxR3} = selector(state, 'debutR3', 'finR3', 'noeudR3', 'tauxR3')
    return {
	  debutR3,
	  finR3,
	  noeudR3,
	  tauxR3
    }
  }
)(ReductionTrain)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutR3, finR3, noeudR3,tauxR3) => dispatch(addScenarioRTrain(debutR3,finR3,noeudR3,tauxR3)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReductionTrain);
