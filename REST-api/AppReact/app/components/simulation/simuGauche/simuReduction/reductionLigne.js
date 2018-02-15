import React from 'react';
import {button,cadre, cadre1, row, affichage, span, field, label} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import {addScenarioRLigne} from '../../../../reduxStore/actions/actions';
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

class ReductionLigne extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
    }
	erreurD(){
		document.getElementById('errorR2D').setAttribute('hidden','true');
	}
	erreurF(){
		document.getElementById('errorR2F').setAttribute('hidden','true');
	}
	erreurL(){
		document.getElementById('errorR2L').setAttribute('hidden','true');
	}
	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.debutR2);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.finR2);
		if(reg1){
			 document.getElementById('errorR2D_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorR2D').removeAttribute('hidden');
		}

		if(reg2){
			document.getElementById('errorR2F_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorR2F').removeAttribute('hidden');
		}
		
		if(!this.props.ligneR2){
			document.getElementById('errorR2L_info').innerHTML="Selectionnez une ligne!!";
			document.getElementById('errorR2L').removeAttribute('hidden');
		}
		

		if(!(reg1 || reg2 || !this.props.ligneR2)){
			this.props.add(this.props.debutR2,this.props.finR2,this.props.ligneR2)
			this.props.reset();
		}
	}
	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
				<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Rendre une ligne inopérationnelle</label>
				</Row>
				
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>	
								Réduction de {this.props.tauxR2}%  de {this.props.debutR2} à {this.props.finR2} sur la {this.props.ligneR2}
							</div>	
							<Col sm={6}>
								<Field name="debutR2" component={renderField} type="text" placeholder="ex: 09h00" label="Heure de début" onChange={this.erreurD}/>
								<span id="errorR2D" role="alert" hidden style={span}>
									<span id='errorR2D_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="finR2" component={renderField} type="text" placeholder="ex: 23h00" label="Heure de fin" onChange={this.erreurF}/>
								<span id="errorR2F" role="alert" hidden style={span}>
									<span id='errorR2F_info'></span>
								</span>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12} >		
								<div style={{paddingLeft:'25%'}}>
									<label>Sélectionnez la ligne</label>
									<div>
										<Field name="ligneR2" component="select" multiple value={[]} type="select-multiple" style={{width:150}} onChange={this.erreurL}>
											{this.props.MesLignes.map(items =>
											<option key={items.idatelier}>{items.ligne}</option>)
											}
										</Field>
									</div>
									<span id="errorR2L" role="alert" hidden style={span}>
										<span id='errorR2L_info'></span>
									</span>									
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
		);
	}
}
ReductionLigne = reduxForm({
  form: 'addScenarioRLigne'  // a unique identifier for this form
})(ReductionLigne)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioRLigne') // <-- same as form name
ReductionLigne = connect(
  state => {
    // or together as a group
    const { debutR2, finR2, ligneR2} = selector(state, 'debutR2', 'finR2', 'ligneR2')
    return {
	  debutR2,
	  finR2,
	  ligneR2
    }
  }
)(ReductionLigne)

const mapStateToProps = (state) => {
    return {
		MesLignes: state.itemsLine
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (debutR2, finR2, ligneR2) => dispatch(addScenarioRLigne(debutR2,finR2,ligneR2))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReductionLigne);
