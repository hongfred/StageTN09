import React from 'react';
import {cadre, tabSimu, navSimu, buttonNav} from '../../../css/style';
import {Nav, NavItem, Tab, Row, Col, Grid, Panel, Tabs} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  itemsFetchData
} from '../../../reduxStore/actions/actions';

import {SimuPerturbation} from './simuPerturbation/simuPerturbation';
import ReductionLien from './simuReduction/reductionLien';
import ReductionLigne from './simuReduction/reductionLigne';
import ReductionTrain from './simuReduction/reductionTrain';
import AugmentationLigne from './simuAugmentation/augmentationLigne';
import AugmentationLien from './simuAugmentation/augmentationLien';
import AugmentationNoeud from './simuAugmentation/augmentationNoeud';


export class SimuGaucheStructure extends React.Component{
	constructor(props) {
		super(props);
    }
	
	componentWillMount() {
		this.props.fetchData("http://localhost:1337/fetch/ligne", "2");
		this.props.fetchData("http://localhost:1337/fetch/composants", "7");
	}
	
	render(){
		return (
			<Row className="show-grid">
				<Panel header="Set the options" bsStyle="primary">
					<Tabs defaultActiveKey={2} id='tabs' style = {tabSimu}>
						<Tab eventKey={1} title="Perturbations">	
							<Tab.Container id="left-tabs" defaultActiveKey="first" style = {cadre}>
								<Row className="clearfix">
									<label style={{color:'red'}}>L'application en backend ne possède pas encore les classes qui permettent le codage des perturbations</label>
									<Col sm={4}>
										<Nav bsStyle="pills" stacked style = {navSimu}>
											<NavItem eventKey="first" style={buttonNav}>
												element 1
											</NavItem>
											<NavItem eventKey="second" style={buttonNav}>
												element 2
											</NavItem>
										</Nav>
									</Col>
									<SimuPerturbation/>
								</Row>
							</Tab.Container>
						</Tab>
						<Tab eventKey={2} title="Réduction de la capacité">
							<Tab.Container id="middle-tabs" defaultActiveKey="first" style = {cadre}>
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
												capacité d'un train
											</NavItem>
										</Nav>
									</Col>
									
									<Col sm={8}>
										<Tab.Content animation>
											<Tab.Pane eventKey="first" style = {cadre}>
												<ReductionLien/>	
											</Tab.Pane>
											<Tab.Pane eventKey="second" style = {cadre}>
												<ReductionLigne/>
											</Tab.Pane>
											<Tab.Pane eventKey="third" style = {cadre}>
												<ReductionTrain/>
											</Tab.Pane>
										</Tab.Content>
									</Col>
								</Row>
							</Tab.Container>
						</Tab>
						<Tab eventKey={3} title="Augmentation du temps de parcours et/ou de correspondance">
							<Tab.Container id="middle-tabs" defaultActiveKey="first" style = {cadre}>
									<Row className="clearfix">
										<Col sm={4}>
											<Nav bsStyle="pills" stacked style = {navSimu}>
												<NavItem eventKey="first" style={buttonNav}>
													Sur une lien
												</NavItem>
												<NavItem eventKey="second" style={buttonNav}>
													Sur un ligne
												</NavItem>
												<NavItem eventKey="third" style={buttonNav}>
													Sur un noeud
												</NavItem>
											</Nav>
										</Col>
										
										<Col sm={8}>
											<Tab.Content animation>
												<Tab.Pane eventKey="first" style = {cadre}>
													<AugmentationLien/>
												</Tab.Pane>
												<Tab.Pane eventKey="second" style = {cadre}>
													
													<AugmentationLigne/>
												</Tab.Pane>
												<Tab.Pane eventKey="third" style = {cadre}>
													<AugmentationNoeud/>
												</Tab.Pane>
											</Tab.Content>
										</Col>
									</Row>
								</Tab.Container>
						</Tab>
					</Tabs>											
				</Panel>
			</Row>	
		);
	}
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
		fetchData: (url, option) => dispatch(itemsFetchData(url, option))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimuGaucheStructure);

