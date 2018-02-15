import React from 'react';
import {cadre} from 'D:/frederic/Documents/cours/code/AppReact/app/css/style';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector} from 'redux-form'

class StoreV extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div style = {cadre}>
				<h4>C'est mon store:</h4>
				<ul>
					<li>Result: {JSON.stringify(this.props.MesItems)}</li>
					<li>Lignes: {JSON.stringify(this.props.MesLignes)}</li>
					<li>ComposantsR: {JSON.stringify(this.props.MesComposantsR[0])}</li>
					<li>Voisins: {JSON.stringify(this.props.MesVoisinsR)}</li>
					<li>ComposantsA: {JSON.stringify(this.props.MesComposantsA[0])}</li>
					<li>VoisinsA: {JSON.stringify(this.props.MesVoisinsA)}</li>
					<li>Todos: {JSON.stringify(this.props.maListe)}</li>
					<li>Scenarios: {JSON.stringify(this.props.MesScenarios)}</li>
					<li>Scenario: {JSON.stringify(this.props.Sc)}</li>
				</ul>
			</div>
		)
	}
}
const selector = formValueSelector('addScenarioA') // <-- same as form name
StoreV = connect(
  state => {
    // or together as a group
    const { debut, fin, ligne, taux} = selector(state, 'debut', 'fin', 'ligne', 'taux')
    return {
      Sc: `debut: ${debut || ''} , fin: ${fin || ''} , ligne: ${ligne || ''} , taux: ${taux || ''}`
    }
  }
)(StoreV)
const mapStateToProps = (state) => {
    return {
		MesItems: state.results, //gauche: nom de variable droite: le reducteur qui correspond
        MesLignes: state.itemsLine,
		MesComposantsR: state.itemsComposantR,
		MesComposantsA: state.itemsComposantA,
		MesVoisinsR: state.itemsVoisinR,
		MesVoisinsA: state.itemsVoisinA,
		maListe: state.todos,
		MesScenarios: state.scenarios,
    };
};

export default connect(mapStateToProps)(StoreV)
