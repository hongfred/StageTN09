import React from 'react';
import {jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, navSimu} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
  itemsFetchData
} from '../reduxStore/actions/actions';
import { connect } from 'react-redux';



import {Page3b1} from './page3b1';
import Page3b2 from './page3b2';
import Page3b3 from './page3b3';

class Page3b extends React.Component{
	constructor(props) {
		super(props);
    }
	componentWillMount() {
		this.props.fetchData("http://localhost:1337/fetch/ligne", "2");
		this.props.fetchData("http://localhost:1337/fetch/composant", "3");
	}
	render(){
		return (
			<Row className="show-grid">
				<Panel header="Set the options" bsStyle="primary">
					<Tabs defaultActiveKey={2} id='tabs' style = {tabSimu}>
						<Tab eventKey={1} title="Perturbations">
							<Page3b1/>
						</Tab>
						<Tab eventKey={2} title="Réduction de la capacité">
							<Page3b2/>
						</Tab>
						<Tab eventKey={3} title="Augmentation du temps de parcours et/ou de correspondance">
							<Page3b3/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page3b);
