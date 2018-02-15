import React from 'react'
import {button, cadre, cadre1, row, affichage, span, field, label} from '../../../../css/style';
import {Button, Tab, Row, Col, Grid, Tabs} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  itemsFetchData,
  addScenarioALigne
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

class AugmentationLigne extends React.Component{
	constructor(props) {
        super(props);
		this.addS = this.addS.bind(this)
    }
	
	erreurD(){
		document.getElementById('errorD').setAttribute('hidden','true');
	}
	erreurF(){
		document.getElementById('errorF').setAttribute('hidden','true');
	}
	erreurL(){
		document.getElementById('errorL').setAttribute('hidden','true');
	}
	erreurT(){
		document.getElementById('errorT').setAttribute('hidden','true');
	}
	
	addS(){
		const reg1=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.debut);
		const reg2=!/^([0-9]|0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/.test(this.props.fin);
		const reg3=!/^[0-9]*$/.test(this.props.taux);
		if(reg1){
			 document.getElementById('errorD_info').innerHTML="Format de l'heure de début non conforme!!";
			 document.getElementById('errorD').removeAttribute('hidden');
		}

		if(reg2){
			document.getElementById('errorF_info').innerHTML="Format de l'heure de fin non conforme!!";
			document.getElementById('errorF').removeAttribute('hidden');
		}
		
		if(!this.props.ligne){
			document.getElementById('errorL_info').innerHTML="Selectionnez une ligne!!";
			document.getElementById('errorL').removeAttribute('hidden');
		}
		
		if(reg3){
			document.getElementById('errorT_info').innerHTML="Format du taux non conforme!!";
			document.getElementById('errorT').removeAttribute('hidden');
		}

		if(!(reg1 || reg2 || reg3 || !this.props.ligne)){
			this.props.add(this.props.debut,this.props.fin,this.props.ligne,this.props.taux)
			this.props.reset();
		}
	}
	render(){
		const { handleSubmit, pristine, reset, submitting} = this.props
		return (
			<Grid>
				<Row style={{paddingTop:5, backgroundColor:'rgb(192, 214, 249)'}}>
					<label style={label}>Augmentation du taux de temps sur une ligne</label>
				</Row>
				<form>
					<Row className="show-grid" style = {row}>
						<Row className="show-grid" >
							<div style = {affichage}>	
								Augmentation de {this.props.taux}%  de {this.props.debut} à {this.props.fin} sur la {this.props.ligne}
							</div>	
							<Col sm={6}>
								<Field name="debut" component={renderField} type="text" placeholder="ex: 09h00" label="Début" onChange={this.erreurD}/>
								<span id="errorD" role="alert" hidden style={span}>
									<span id='errorD_info'></span>
								</span>
							</Col>
							<Col sm={6}>
								<Field name="fin" component={renderField} type="text" placeholder="ex: 23h00" label="Fin" onChange={this.erreurF}/>
								<span id="errorF" role="alert" hidden style={span}>
									<span id='errorF_info'></span>
								</span>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12} >		
								<div>
									<label>Ligne</label>
									<div>
										<Field name="ligne" component="select" style={{width:80}} onChange={this.erreurL}>
											<option></option>
											{this.props.MesLignes.map(items =>
											<option key={items.idatelier} >{items.ligne}</option>)
											}
										</Field>
									</div>	
									<span id="errorL" role="alert" hidden style={span}>
										<span id='errorL_info'></span>
									</span>
								</div>
							</Col>
						</Row>
						<Row className="show-grid" style = {row}>
							<Col md={12}>		
								<Field name="taux" component={renderField} type="text" placeholder="ex: 23" label="Taux d'augmentation du temps (%)" onChange={this.erreurT}/>	
								<span id="errorT" role="alert" hidden style={span}>
									<span id='errorT_info'></span>
								</span>
							</Col>
						</Row>
					</Row>
					<Row className="show-grid">
						<Button onClick={this.addS} style = {button}>
							Submit
						</Button>
					</Row>
				</form>
			</Grid>	
		);
	};
};


AugmentationLigne = reduxForm({
  form: 'addScenarioALigne' // a unique identifier for this form
})(AugmentationLigne)

// Decorate with connect to read form values
const selector = formValueSelector('addScenarioALigne') // <-- same as form name
AugmentationLigne = connect(
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
)(AugmentationLigne)

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

export default connect(mapStateToProps, mapDispatchToProps)(AugmentationLigne);